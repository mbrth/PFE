import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Course, UserRole } from '../types';

type View = 'dashboard' | 'catalog' | 'chat' | 'management' | 'course-viewer';

interface AppContextType {
  activeView: View;
  setView: (view: View) => void;
  selectedCourse: Course | null;
  openCourse: (course: Course) => void;
  closeCourse: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Global State Provider to decouple navigation from component structure.
 * This enables "Udemy-like" features where state persists across view changes.
 */
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const openCourse = (course: Course) => {
    setSelectedCourse(course);
    setActiveView('course-viewer');
  };

  const closeCourse = () => {
    setSelectedCourse(null);
    setActiveView('catalog');
  };

  return (
    <AppContext.Provider value={{ 
      activeView, 
      setView: setActiveView, 
      selectedCourse, 
      openCourse, 
      closeCourse,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
