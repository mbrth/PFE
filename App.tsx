import React from 'react';
import LandingPage from './components/features/LandingPage';
import AuthModal from './components/ui/AuthModal';
import AIOnboarding from './components/features/AIOnboarding';
import ChatInterface from './components/features/ChatInterface';
import Dashboard from './components/features/Dashboard';
import CourseCatalog from './components/features/CourseCatalog';
import CourseManagement from './components/features/CourseManagement';
import CourseViewer from './components/features/CourseViewer';
import ProfileModal from './components/ui/ProfileModal';
import MainLayout from './layouts/MainLayout';
import { useTheme } from './hooks/useTheme';
import { useAppSession } from './hooks/useAppSession';
import { useApp } from './context/AppContext';

/**
 * Root component orchestrating the high-level application lifecycle.
 * Navigation and data selection state are centralized in AppContext.
 * Authentication and session state are managed via useAppSession.
 */
const App: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { activeView, setView, selectedCourse, openCourse, closeCourse, searchQuery, setSearchQuery } = useApp();
  
  const {
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
  } = useAppSession();

  if (loading && isLoggedIn) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-base-bg">
        <i className="fa-solid fa-circle-notch animate-spin text-4xl text-sage"></i>
      </div>
    );
  }

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

  return (
    <MainLayout
      isDark={isDark}
      toggleTheme={toggleTheme}
      userName={userName}
      persona={persona}
      userRole={userRole}
      activeTab={activeView === 'course-viewer' ? 'catalog' : activeView}
      setActiveTab={(tab) => setView(tab as any)}
      search={searchQuery}
      setSearch={setSearchQuery}
      onLogout={handleLogout}
      setIsProfileModalOpen={setIsProfileModalOpen}
      hideLayout={activeView === 'course-viewer'}
    >
      {activeView === 'course-viewer' && selectedCourse ? (
        <CourseViewer course={selectedCourse} onBack={closeCourse} />
      ) : (
        <>
          {activeView === 'dashboard' && (
            <Dashboard isDark={isDark} userRole={userRole} />
          )}
          
          {activeView === 'catalog' && (
            <CourseCatalog 
              search={searchQuery} 
              isDark={isDark} 
              userRole={userRole} 
              onSelectCourse={openCourse} 
            />
          )}

          {activeView === 'management' && (userRole === 'admin' || userRole === 'instructor') && (
            <CourseManagement 
              userRole={userRole} 
              onPreviewCourse={openCourse} 
            />
          )}

          {activeView === 'chat' && (
            <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
               <div className="mb-8 text-center">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Consultant IA</h1>
                  <p className="text-slate-500 text-sm">Planifiez votre développement de compétences responsables.</p>
               </div>
               <ChatInterface />
            </div>
          )}
        </>
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
