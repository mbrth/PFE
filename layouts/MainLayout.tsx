
import React, { useState, useRef, useEffect } from 'react';
import Sidebar, { NavItem } from '../components/ui/Sidebar';
import Header from '../components/ui/Header';
import { UserRole } from '../types';

interface MainLayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  toggleTheme: () => void;
  userName: string;
  persona: string;
  userRole: UserRole;
  activeTab: string;
  setActiveTab: (id: any) => void;
  search: string;
  setSearch: (s: string) => void;
  onLogout: () => void;
  setIsProfileModalOpen: (open: boolean) => void;
  hideLayout?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isDark,
  toggleTheme,
  userName,
  persona,
  userRole,
  activeTab,
  setActiveTab,
  search,
  setSearch,
  onLogout,
  setIsProfileModalOpen,
  hideLayout = false
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Impact & Suivi', group: 'ANALYTIQUE' },
    { id: 'catalog', icon: 'fa-book-open-reader', label: 'Formations', group: 'APPRENTISSAGE' },
    { id: 'chat', icon: 'fa-robot', label: 'Mentor IA', group: 'ACCOMPAGNEMENT' }
  ];

  if (userRole === 'admin' || userRole === 'instructor') {
    navItems.push({ id: 'management', icon: 'fa-screwdriver-wrench', label: 'Gestion', group: 'ADMINISTRATION' });
  }

  const notificationsList = [
    { id: 1, title: 'Nouveau cours: Architecture Souveraine', time: '2h' },
    { id: 2, title: 'Votre profil a gagné 5 points d\'éthique', time: '1j' },
    { id: 3, title: 'Rappel: Finaliser le module Eco-Code', time: '3j' }
  ];

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (showNotifications && notificationsRef.current && !notificationsRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [showNotifications]);

  return (
    <div className={`min-h-screen flex font-sans antialiased relative ${isDark ? 'bg-ink text-base-bg' : 'bg-base-bg text-ink'}`}>
      {!hideLayout && (
        <Sidebar 
          navItems={navItems}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          userName={userName}
          persona={persona}
          onLogout={onLogout}
          isDark={isDark}
        />
      )}

      <div className={`flex-1 flex flex-col min-w-0 ${!hideLayout ? 'lg:ml-72' : ''}`}>
        {!hideLayout && (
          <Header 
            isDark={isDark}
            toggleTheme={toggleTheme}
            activeTab={activeTab}
            persona={persona}
            search={search}
            setSearch={setSearch}
            showNotifications={showNotifications}
            setShowNotifications={setShowNotifications}
            notificationsRef={notificationsRef}
            notificationsList={notificationsList}
            userName={userName}
            setIsProfileModalOpen={setIsProfileModalOpen}
            setIsDrawerOpen={setIsDrawerOpen}
          />
        )}

        <main className={`${!hideLayout ? 'p-6 lg:p-12 max-w-[1600px] w-full mx-auto' : 'w-full'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
