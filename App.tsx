import React from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import AIOnboarding from './components/AIOnboarding';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import CourseCatalog from './components/CourseCatalog';
import ProfileModal from './components/ProfileModal';
import MainLayout from './layouts/MainLayout';
import { useTheme } from './hooks/useTheme';
import { useAppSession } from './hooks/useAppSession';

/**
 * Root component of the EcoOrient application.
 * It orchestrates the top-level navigation, authentication flow, and theme management
 * to ensure a seamless transition between discovery, onboarding, and the main dashboard.
 */
const App: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const {
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
  } = useAppSession();

  // If the user is not authenticated, we prioritize the marketing and authentication journey.
  if (!isLoggedIn && !showOnboarding) {
    return (
      <>
        <LandingPage onStart={() => setShowAuthModal(true)} />
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
          onSuccess={handleAuthSuccess} 
        />
      </>
    );
  }

  // New users are guided through an AI-powered onboarding to define their initial eco-persona.
  if (showOnboarding) {
    return <AIOnboarding userName={userName} onComplete={handleOnboardingComplete} />;
  }

  // Once authenticated, the user gains access to the personalized management interface.
  return (
    <MainLayout
      isDark={isDark}
      toggleTheme={toggleTheme}
      userName={userName}
      persona={persona}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      search={search}
      setSearch={setSearch}
      onLogout={handleLogout}
      setIsProfileModalOpen={setIsProfileModalOpen}
    >
      {activeTab === 'dashboard' && <Dashboard isDark={isDark} search={search} />}
      
      {activeTab === 'catalog' && (
        <CourseCatalog search={search} isDark={isDark} />
      )}

      {activeTab === 'chat' && (
        <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
           <div className="mb-8 text-center">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">AI Consultant</h1>
              <p className="text-slate-500 text-sm">Plan your responsible skills development.</p>
           </div>
           <ChatInterface />
        </div>
      )}

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        userName={userName} 
        persona={persona} 
      />
    </MainLayout>
  );
};

export default App;
