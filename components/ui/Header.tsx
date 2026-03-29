
import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  activeTab: string;
  persona: string;
  search: string;
  setSearch: (s: string) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  notificationsRef: React.RefObject<HTMLDivElement | null>;
  notificationsList: any[];
  userName: string;
  setIsProfileModalOpen: (open: boolean) => void;
  setIsDrawerOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  isDark,
  toggleTheme,
  activeTab,
  persona,
  search,
  setSearch,
  showNotifications,
  setShowNotifications,
  notificationsRef,
  notificationsList,
  userName,
  setIsProfileModalOpen,
  setIsDrawerOpen
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTabLabel = () => {
    switch (activeTab) {
      case 'dashboard': return 'Moteur Analytique';
      case 'catalog': return 'Catalogue de Formations';
      case 'chat': return 'Accompagnement IA';
      default: return '';
    }
  };

  const bgClass = isDark ? 'bg-ink/90 border-base-bg/10' : 'bg-base-bg/90 border-ink/5';
  const textClass = isDark ? 'text-base-bg' : 'text-ink';
  const mutedTextClass = isDark ? 'text-base-bg/50' : 'text-ink/50';
  const iconBgClass = isDark ? 'bg-base-bg/5 text-base-bg hover:bg-base-bg/10' : 'bg-white text-ink border border-ink/5 hover:shadow-sm';

  const getPersonaRecommendations = () => {
    const p = persona.toLowerCase();
    
    if (p.includes('dév') || p.includes('code') || p.includes('tech')) {
      return [
        { title: "Éco-conception Logicielle", icon: "fa-code" },
        { title: "Clean Architecture & TDD", icon: "fa-file-code" },
        { title: "Fullstack Next.js & Edge", icon: "fa-bolt" }
      ];
    }
    if (p.includes('data') || p.includes('ia')) {
      return [
        { title: "Data Science & IA Générative", icon: "fa-brain" },
        { title: "Big Data & Green Analytics", icon: "fa-chart-simple" },
        { title: "TinyML : IA Frugale", icon: "fa-microchip" }
      ];
    }
    if (p.includes('cloud') || p.includes('ops')) {
      return [
        { title: "Architecture Cloud Souveraine", icon: "fa-cloud" },
        { title: "GreenOps & Optimisation", icon: "fa-leaf" },
        { title: "Docker & CI/CD Responsable", icon: "fa-box-open" }
      ];
    }
    return [
      { title: "Fondamentaux du Numérique Responsable", icon: "fa-earth-europe" },
      { title: "Éco-conception Logicielle", icon: "fa-code" },
      { title: "UX/UI Design Responsable", icon: "fa-pen-nib" }
    ];
  };

  const recommendations = getPersonaRecommendations();

  return (
    <header className={`sticky top-0 z-40 ${bgClass} border-b backdrop-blur-md px-6 lg:px-12 py-6 flex items-center justify-between`}>
      <div className="flex items-center gap-6">
         <button 
           onClick={() => setIsDrawerOpen(true)}
           className={`lg:hidden w-12 h-12 flex items-center justify-center rounded-2xl transition-all active:scale-90 ${iconBgClass}`}
         >
           <i className="fa-solid fa-bars-staggered text-lg"></i>
         </button>
         
         <div className="hidden sm:block">
           <h2 className={`text-xs font-black uppercase tracking-[0.2em] ${mutedTextClass}`}>
             {getTabLabel()}
           </h2>
           <p className="text-sm font-bold flex items-center gap-2 mt-1">
             <span className="w-2 h-2 rounded-full bg-sage"></span> 
             {persona}
           </p>
         </div>
      </div>

      <div className="flex-1 max-w-xl mx-8 hidden md:block relative" ref={searchRef}>
         <div className="relative group">
            <i className={`fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-base-bg/40 group-focus-within:text-sage' : 'text-ink/40 group-focus-within:text-sage'}`}></i>
            <input 
              type="text" 
              value={search}
              onFocus={() => setIsSearchFocused(true)}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher une compétence, un cours..." 
              className={`w-full pl-14 pr-6 py-4 rounded-2xl text-sm font-bold outline-none transition-all ${
                isDark 
                  ? 'bg-base-bg/5 border border-base-bg/10 text-base-bg focus:ring-4 focus:ring-sage/20' 
                  : 'bg-white border border-ink/5 text-ink focus:ring-4 focus:ring-sage/20 shadow-sm'
              }`}
            />
         </div>

         {/* Predictive Recommendations Dropdown */}
         {isSearchFocused && !search && (
           <div className={`absolute top-full left-0 right-0 mt-3 p-4 rounded-3xl shadow-2xl border animate-in fade-in slide-in-from-top-2 duration-300 backdrop-blur-xl z-50 ${
             isDark ? 'bg-ink/95 border-base-bg/10' : 'bg-white/95 border-ink/5'
           }`}>
             <div className="px-4 py-2 border-b border-inherit mb-3">
               <p className={`text-[10px] font-black uppercase tracking-widest ${mutedTextClass}`}>Recommandé pour vous</p>
             </div>
             <ul className="space-y-1">
               {recommendations.map((rec, idx) => (
                 <li key={idx}>
                   <button 
                     onClick={() => {
                       setSearch(rec.title);
                       setIsSearchFocused(false);
                     }}
                     className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all text-left group ${
                       isDark ? 'hover:bg-base-bg/10' : 'hover:bg-sage/10'
                     }`}
                   >
                     <div className={`w-10 h-10 flex items-center justify-center rounded-xl transition-colors ${
                       isDark ? 'bg-base-bg/5 text-sage group-hover:bg-sage/20' : 'bg-sage/5 text-sage group-hover:bg-sage/20'
                     }`}>
                       <i className={`fa-solid ${rec.icon}`}></i>
                     </div>
                     <div>
                       <p className="text-sm font-bold">{rec.title}</p>
                       <p className={`text-[10px] font-bold opacity-50`}>Formation certifiée EcoOrient</p>
                     </div>
                     <i className="fa-solid fa-chevron-right ml-auto text-[10px] opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"></i>
                   </button>
                 </li>
               ))}
             </ul>
           </div>
         )}
      </div>

       <div className="flex items-center gap-4">
         <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${iconBgClass}`}
         >
          <i className={`fa-solid ${isDark ? 'fa-moon' : 'fa-sun text-sand-dark'}`}></i>
         </button>

         <div className="relative" ref={notificationsRef}>
           <button 
             onClick={() => setShowNotifications(!showNotifications)} 
             aria-expanded={showNotifications} 
             aria-label="Notifications" 
             className={`relative w-12 h-12 flex items-center justify-center rounded-2xl transition-all ${iconBgClass}`}
           >
             <i className="fa-solid fa-bell"></i>
             <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-clay rounded-full border-2 border-white"></span>
           </button>

           {showNotifications && (
             <div role="dialog" aria-label="Notifications" className={`absolute right-0 mt-4 w-96 max-h-96 overflow-auto rounded-3xl shadow-2xl z-50 ${isDark ? 'bg-ink border border-base-bg/10' : 'bg-white border border-ink/5'}`}>
               <div className="p-6 border-b border-inherit">
                 <div className="flex items-center justify-between">
                   <strong className="text-lg font-black">Notifications</strong>
                   <button onClick={() => setShowNotifications(false)} className={`text-sm font-bold ${mutedTextClass} hover:text-inherit`}>Fermer</button>
                 </div>
               </div>
               <ul className="p-3 space-y-2">
                 {notificationsList.length === 0 && (
                   <li className={`text-sm font-bold ${mutedTextClass} p-4 text-center`}>Aucune notification</li>
                 )}
                 {notificationsList.map(n => (
                   <li key={n.id} className={`p-4 rounded-2xl transition-colors ${isDark ? 'hover:bg-base-bg/5' : 'hover:bg-base-bg'}`}>
                     <div className="flex items-center justify-between gap-4">
                       <div className="text-sm font-bold flex-1">{n.title}</div>
                       <div className={`text-[10px] font-black uppercase tracking-widest ${mutedTextClass}`}>{n.time}</div>
                     </div>
                   </li>
                 ))}
               </ul>
               <div className="p-4 border-t border-inherit text-center">
                 <button className="text-xs font-black uppercase tracking-[0.2em] text-sage hover:text-sage-light transition-colors">Voir tout</button>
               </div>
             </div>
           )}
         </div>
         
         <button 
           onClick={() => setIsProfileModalOpen(true)}
           className={`flex items-center gap-4 pl-6 ml-2 border-l transition-opacity group hover:opacity-80 border-transparent ${isDark ? 'border-base-bg/10' : 'border-ink/5'}`}
         >
            <div className="text-right hidden sm:block">
               <p className={`text-sm font-black leading-none transition-colors group-hover:text-sage ${textClass}`}>{userName}</p>
               <p className={`text-[10px] font-bold uppercase tracking-widest mt-1.5 ${mutedTextClass}`}>Gérer le profil</p>
            </div>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} className={`w-12 h-12 rounded-2xl shadow-sm transition-all group-hover:scale-105 ${isDark ? 'bg-base-bg/10' : 'bg-base-bg'}`} alt="avatar" />
         </button>
      </div>
    </header>
  );
};

export default Header;
