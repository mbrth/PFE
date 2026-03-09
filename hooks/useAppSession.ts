import { useState, useCallback } from 'react';

type Tab = 'catalog' | 'dashboard' | 'chat';

/**
 * Orchestrates the application's global session and navigation state.
 * This hook isolates the business logic of user lifecycle (auth, onboarding, logout)
 * from the layout-level concerns of App.tsx.
 */
export const useAppSession = () => {
  // User Authentication and Identity
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [persona, setPersona] = useState('Apprenant Engagé');
  
  // App Navigation and Search
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [search, setSearch] = useState('');

  /**
   * Finalizes the authentication process by deciding if the user 
   * needs initial guidance (onboarding) or direct access.
   */
  const handleAuthSuccess = useCallback((isNewUser: boolean, name: string) => {
    setShowAuthModal(false);
    setUserName(name);
    if (isNewUser) {
      setShowOnboarding(true);
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  /**
   * Transition from the discovery phase to the main dashboard
   * once the user's eco-profile has been calculated.
   */
  const handleOnboardingComplete = useCallback((generatedPersona: string) => {
    setPersona(generatedPersona);
    setShowOnboarding(false);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  }, []);

  /**
   * Cleans up the current session and redirects the user 
   * to the starting point.
   */
  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  }, []);

  return {
    isLoggedIn,
    showOnboarding,
    showAuthModal,
    setShowAuthModal,
    isProfileModalOpen,
    setIsProfileModalOpen,
    userName,
    persona,
    activeTab,
    setActiveTab,
    search,
    setSearch,
    handleAuthSuccess,
    handleOnboardingComplete,
    handleLogout
  };
};
