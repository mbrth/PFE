
import React, { useState, useRef, useEffect } from 'react';
import Sidebar, { NavItem } from '../components/Sidebar';
import Header from '../components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
  isDark: boolean;
  toggleTheme: () => void;
  userName: string;
  persona: string;
  activeTab: string;
  setActiveTab: (id: any) => void;
  search: string;
  setSearch: (s: string) => void;
  onLogout: () => void;
  setIsProfileModalOpen: (open: boolean) => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  isDark,
  toggleTheme,
  userName,
  persona,
  activeTab,
  setActiveTab,
  search,
  setSearch,
  onLogout,
  setIsProfileModalOpen
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);

  const navItems: NavItem[] = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard', group: 'ANALYTIQUE' },
    { id: 'catalog', icon: 'fa-book-open-reader', label: 'Formations', group: 'APPRENTISSAGE' },
    { id: 'chat', icon: 'fa-message-bot', label: 'Expert IA', group: 'CONSEIL' }
  ];

  const notificationsList = [
    { id: 1, title: 'New course available: Eco-design', time: '2h' },
    { id: 2, title: 'Your profile gained 5 maturity points', time: '1d' },
    { id: 3, title: 'Reminder: complete GDPR module', time: '3d' }
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
    <div className={`min-h-screen flex font-sans antialiased relative ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-[#FDFDFE] text-slate-900'}`}>
      <Sidebar 
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        userName={userName}
        persona={persona}
        onLogout={onLogout}
      />

      <div className="flex-1 lg:ml-20 flex flex-col min-w-0">
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

        <main className="p-6 lg:p-12 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
