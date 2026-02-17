import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import AIOnboarding from './components/AIOnboarding';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import CourseCatalog from './components/CourseCatalog';
import ProfileModal from './components/ProfileModal';
import MainLayout from './layouts/MainLayout';
import { useTheme } from './hooks/useTheme';

const App: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  
  // User state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [persona, setPersona] = useState('Apprenant Engagé');
  
  // Navigation state
  const [activeTab, setActiveTab] = useState<'catalog' | 'dashboard' | 'chat'>('dashboard');
  const [search, setSearch] = useState('');

  const handleAuthSuccess = (isNewUser: boolean, name: string) => {
    setShowAuthModal(false);
    setUserName(name);
    if (isNewUser) {
      setShowOnboarding(true);
    } else {
      setIsLoggedIn(true);
    }
  };

  const handleOnboardingComplete = (generatedPersona: string) => {
    setPersona(generatedPersona);
    setShowOnboarding(false);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('dashboard');
  };

  // Auth/Onboarding views
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

  if (showOnboarding) {
    return <AIOnboarding userName={userName} onComplete={handleOnboardingComplete} />;
  }

  // Main application view
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
