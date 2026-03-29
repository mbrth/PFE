import { useState, useCallback, useEffect } from 'react';
import { db } from '../services/db';
import { UserRole } from '../types';

/**
 * Orchestrates user lifecycle (auth, profile, session).
 * Decoupled from navigation to maintain clear responsibilities.
 */
export const useAppSession = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('user');
  const [persona, setPersona] = useState('Apprenant Engagé');

  useEffect(() => {
    const initializeSession = async () => {
      try {
        const { data: { session } } = await db.auth.getSession();
        if (session?.user) {
          setIsLoggedIn(true);
          const profile = session.user;
          setUserName(profile.fullName || profile.full_name || '');
          setPersona(profile.persona || 'Apprenant Engagé');
          setUserRole((profile.role as UserRole) || 'user');
        }
      } catch (err) {
        console.error("Session initialization failed:", err);
      } finally {
        setLoading(false);
      }
    };
    initializeSession();
  }, []);

  const handleAuthSuccess = useCallback(async (isNewUser: boolean, name: string) => {
    setTimeout(async () => {
      const { data: { session } } = await db.auth.getSession();
      if (session?.user) {
        setUserName(session.user.fullName || session.user.full_name || name);
        setPersona(session.user.persona || 'Apprenant Engagé');
        setUserRole((session.user.role as UserRole) || 'user');
        setIsLoggedIn(true);
        setShowAuthModal(false);
        if (isNewUser) setShowOnboarding(true);
      }
    }, 100);
  }, []);

  const handleOnboardingComplete = useCallback(async (generatedPersona: string) => {
    setPersona(generatedPersona);
    setShowOnboarding(false);
    setIsLoggedIn(true);

    const { data: { session } } = await db.auth.getSession();
    if (session?.user) {
      await db.updateUserProfile(session.user.id, { persona: generatedPersona });
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await db.auth.logout();
    setIsLoggedIn(false);
    setUserRole('user');
    setUserName('');
  }, []);

  return {
    isLoggedIn,
    loading,
    userRole,
    showOnboarding,
    showAuthModal,
    setShowAuthModal,
    isProfileModalOpen,
    setIsProfileModalOpen,
    userName,
    persona,
    handleAuthSuccess,
    handleOnboardingComplete,
    handleLogout
  };
};
