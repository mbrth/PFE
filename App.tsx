
import React, { useState, useEffect, useRef } from 'react';
import LandingPage from './components/LandingPage';
import AuthModal from './components/AuthModal';
import AIOnboarding from './components/AIOnboarding';
import ChatInterface from './components/ChatInterface';
import Dashboard from './components/Dashboard';
import CourseCard from './components/CourseCard';
import ProfileModal from './components/ProfileModal';
import { MOCKED_COURSES } from './constants';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement | null>(null);
  const [userName, setUserName] = useState('');
  const [persona, setPersona] = useState('Apprenant Engagé');
  const [activeTab, setActiveTab] = useState<'catalog' | 'dashboard' | 'chat'>('dashboard');
  const [search, setSearch] = useState('');
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('themeDark') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('themeDark', isDark ? 'true' : 'false');
    } catch {}
  }, [isDark]);

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

  const navItems = [
    { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard', group: 'ANALYTIQUE' },
    { id: 'catalog', icon: 'fa-book-open-reader', label: 'Formations', group: 'APPRENTISSAGE' },
    { id: 'chat', icon: 'fa-message-bot', label: 'Expert IA', group: 'CONSEIL' }
  ];

  const notificationsList = [
    { id: 1, title: 'Nouvelle formation disponible: Eco-design', time: '2h' },
    { id: 2, title: 'Votre profil a gagné 5 points de maturité', time: '1j' },
    { id: 3, title: 'Rappel: complétez le module RGPD', time: '3j' }
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
    <div className={`min-h-screen flex font-sans antialiased relative ${isDark ? 'bg-slate-900 text-slate-100' : 'bg-[#FDFDFE] text-slate-900'}`}>
      {/* PROFESSIONAL MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isDrawerOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsDrawerOpen(false)}
        ></div>
        <aside className={`absolute left-0 inset-y-0 w-80 bg-slate-900 shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          {/* Drawer Header */}
          <div className="p-8 border-b border-slate-800/50">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                  <i className="fa-solid fa-leaf text-xl"></i>
                </div>
                <span className="text-white font-black text-xl tracking-tighter">EcoOrient</span>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/40 hover:text-white transition-colors">
                 <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* Mini User Summary in Drawer */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} className="w-12 h-12 rounded-full bg-slate-800" />
              <div className="overflow-hidden">
                <p className="text-white font-bold text-sm truncate">{userName}</p>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest truncate">{persona}</p>
              </div>
            </div>
          </div>

          {/* Drawer Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto">
            {['ANALYTIQUE', 'APPRENTISSAGE', 'CONSEIL'].map(group => (
              <div key={group} className="space-y-2">
                <p className="px-4 text-[10px] font-black text-slate-500 tracking-[0.2em]">{group}</p>
                {navItems.filter(item => item.group === group).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id as any); setIsDrawerOpen(false); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all ${
                      activeTab === item.id 
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    {item.id === 'chat' ? (
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 1.08.26 2.1.72 3.02L5 18l6.09-1.61c.95.26 1.96.41 2.91.41 3.87 0 7-3.13 7-7s-3.13-7-7-7z" fill="currentColor" />
                        <path d="M8.5 9.5c0-1.93 1.57-3.5 3.5-3.5S15.5 7.57 15.5 9.5 13.93 13 12 13 8.5 11.43 8.5 9.5z" fill="currentColor" opacity="0.9" />
                      </svg>
                    ) : (
                      <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
                    )}
                    <span className="font-bold text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>

          {/* Drawer Footer */}
          <div className="p-6 border-t border-slate-800/50">
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="w-full flex items-center gap-4 p-4 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
            >
              <i className="fa-solid fa-power-off text-lg w-6 text-center"></i>
              <span className="font-bold text-sm">Déconnexion</span>
            </button>
          </div>
        </aside>
      </div>

      {/* DESKTOP SIDEBAR (Existing) */}
      <aside className="hidden lg:flex w-20 hover:w-64 transition-all duration-300 ease-in-out bg-slate-900 flex-col py-8 px-4 border-r border-slate-800 z-50 fixed inset-y-0 overflow-hidden group">
        <div className="flex items-center gap-4 mb-12 px-2">
          <div className="min-w-[40px] h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <i className="fa-solid fa-leaf text-xl"></i>
          </div>
          <span className="text-white font-black text-xl tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">EcoOrient</span>
        </div>
        <nav className="flex flex-col gap-3 flex-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all relative ${
                activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {item.id === 'chat' ? (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 1.08.26 2.1.72 3.02L5 18l6.09-1.61c.95.26 1.96.41 2.91.41 3.87 0 7-3.13 7-7s-3.13-7-7-7z" fill="currentColor" />
                  <path d="M8.5 9.5c0-1.93 1.57-3.5 3.5-3.5S15.5 7.57 15.5 9.5 13.93 13 12 13 8.5 11.43 8.5 9.5z" fill="currentColor" opacity="0.9" />
                </svg>
              ) : (
                <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
              )}
              <span className="font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">{item.label}</span>
              {activeTab === item.id && <div className="absolute right-0 w-1 h-6 bg-white rounded-l-full group-hover:block hidden"></div>}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-4 p-3 w-full text-slate-400 hover:text-rose-400 transition-all">
            <i className="fa-solid fa-power-off text-lg w-6 text-center"></i>
            <span className="font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Quitter</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-20 flex flex-col min-w-0">
        <header className={`sticky top-0 z-40 ${isDark ? 'bg-slate-900/80 border-b border-slate-800 text-slate-100' : 'bg-white/80 border-b border-slate-100 text-slate-900'} backdrop-blur-md px-6 lg:px-12 py-4 flex items-center justify-between`}>
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsDrawerOpen(true)}
               className={`lg:hidden w-11 h-11 flex items-center justify-center rounded-2xl transition-all active:scale-90 ${isDark ? 'text-slate-100 bg-slate-800 hover:bg-slate-700' : 'text-slate-900 bg-slate-100 hover:bg-slate-200'}`}
             >
               <i className="fa-solid fa-bars-staggered text-lg"></i>
             </button>
             
             <div className="hidden sm:block">
               <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                 {activeTab === 'dashboard' ? 'Moteur Analytique' : activeTab === 'catalog' ? 'Catalogue Stratégique' : 'Intelligence Artificielle'}
               </h2>
               <p className="text-xs text-indigo-600 font-bold flex items-center gap-1.5 mt-0.5">
                 <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> 
                 {persona}
               </p>
             </div>
          </div>

          <div className="flex-1 max-w-md mx-8 hidden md:block">
             <div className="relative group">
                <i className={`fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-400 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`}></i>
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher une compétence, un cours..." 
                  className={`w-full pl-11 pr-4 py-2.5 rounded-2xl text-xs font-medium outline-none transition-all ${isDark ? 'bg-slate-700 border border-slate-600 text-slate-100 focus:ring-4 focus:ring-slate-700/50' : 'bg-slate-50 border border-slate-200 focus:ring-4 focus:ring-indigo-100/50 focus:bg-white'}`}
                />
             </div>
          </div>

           <div className="flex items-center gap-4">
             <button
              onClick={() => setIsDark(d => !d)}
              aria-label="Basculer thème"
              className={`w-10 h-10 flex items-center justify-center rounded-xl transition ${isDark ? 'bg-slate-700 text-yellow-300' : 'bg-white/20 text-slate-700'}`}
             >
              <i className={`fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}`}></i>
             </button>

             <div className="relative" ref={notificationsRef}>
               <button onClick={() => setShowNotifications(s => !s)} aria-expanded={showNotifications} aria-label="Notifications" className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isDark ? 'text-slate-300 hover:text-indigo-400 hover:bg-indigo-900/20' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}>
                 <i className="fa-solid fa-bell"></i>
                 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
               </button>

               {showNotifications && (
                 <div role="dialog" aria-label="Notifications" className={`absolute right-0 mt-3 w-80 max-h-80 overflow-auto rounded-xl shadow-2xl z-50 ${isDark ? 'bg-slate-800 border border-slate-700 text-slate-100' : 'bg-white border border-slate-100 text-slate-900'}`}>
                   <div className="p-4 border-b" style={{ borderColor: isDark ? 'rgba(148,163,184,0.06)' : undefined }}>
                     <div className="flex items-center justify-between">
                       <strong className="text-sm">Notifications</strong>
                       <button onClick={() => setShowNotifications(false)} className="text-xs text-slate-400 hover:text-slate-600">Fermer</button>
                     </div>
                   </div>
                   <ul className="p-3 space-y-2">
                     {notificationsList.length === 0 && (
                       <li className="text-xs text-slate-400 p-3">Aucune notification</li>
                     )}
                     {notificationsList.map(n => (
                       <li key={n.id} className={`p-3 rounded-lg ${isDark ? 'hover:bg-slate-700' : 'hover:bg-slate-50'}`}>
                         <div className="flex items-center justify-between">
                           <div className="text-sm font-bold">{n.title}</div>
                           <div className="text-[10px] text-slate-400">{n.time}</div>
                         </div>
                       </li>
                     ))}
                   </ul>
                   <div className="p-3 border-t text-center text-xs" style={{ borderColor: isDark ? 'rgba(148,163,184,0.06)' : undefined }}>
                     <button className="text-indigo-600 hover:underline">Voir toutes les notifications</button>
                   </div>
                 </div>
               )}
             </div>
             
             <button 
               onClick={() => setIsProfileModalOpen(true)}
               className={`flex items-center gap-3 pl-4 border-l transition-opacity group hover:opacity-80 ${isDark ? 'border-slate-700' : 'border-slate-200'}`}
             >
                <div className="text-right hidden sm:block">
                   <p className={`text-xs font-black leading-none transition-colors ${isDark ? 'text-slate-100 group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'}`}>{userName}</p>
                   <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Gérer le profil</p>
                </div>
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} className={`w-9 h-9 rounded-xl shadow-sm transition-all group-hover:ring-indigo-100 ${isDark ? 'bg-slate-700 ring-2 ring-slate-800' : 'bg-slate-100 ring-2 ring-white'}`} />
             </button>
          </div>
        </header>

        <main className="p-6 lg:p-12 max-w-[1600px] w-full mx-auto">
          {activeTab === 'dashboard' && <Dashboard isDark={isDark} search={search} />}
          
          {activeTab === 'catalog' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Parcours Certifiés</h1>
                  <p className="text-slate-500 text-sm">Découvrez des formations auditées pour leur impact et leur souveraineté.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {MOCKED_COURSES
                  .filter(course => {
                    const q = search.trim().toLowerCase();
                    if (!q) return true;
                    return (
                      course.title.toLowerCase().includes(q) ||
                      course.provider.toLowerCase().includes(q) ||
                      course.category.toLowerCase().includes(q) ||
                      course.skills.join(' ').toLowerCase().includes(q)
                    );
                  })
                  .map(course => (
                    <CourseCard key={course.id} course={course} isDark={isDark} />
                  ))}
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="max-w-4xl mx-auto animate-in zoom-in-95 duration-500">
               <div className="mb-8 text-center">
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">Consultant IA</h1>
                  <p className="text-slate-500 text-sm">Planifiez votre montée en compétences responsable.</p>
               </div>
               <ChatInterface />
            </div>
          )}
        </main>
      </div>

      <ProfileModal 
        isOpen={isProfileModalOpen} 
        onClose={() => setIsProfileModalOpen(false)} 
        userName={userName} 
        persona={persona} 
      />
    </div>
  );
};

export default App;
