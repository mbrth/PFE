
import React from 'react';

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
  const getTabLabel = () => {
    switch (activeTab) {
      case 'dashboard': return 'Moteur Analytique';
      case 'catalog': return 'Catalogue Stratégique';
      case 'chat': return 'Intelligence Artificielle';
      default: return '';
    }
  };

  return (
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
             {getTabLabel()}
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
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`w-10 h-10 flex items-center justify-center rounded-xl transition ${isDark ? 'bg-slate-700 text-yellow-300' : 'bg-white/20 text-slate-700'}`}
         >
          <i className={`fa-solid ${isDark ? 'fa-moon' : 'fa-sun'}`}></i>
         </button>

         <div className="relative" ref={notificationsRef}>
           <button onClick={() => setShowNotifications(!showNotifications)} aria-expanded={showNotifications} aria-label="Notifications" className={`relative w-10 h-10 flex items-center justify-center rounded-xl transition-all ${isDark ? 'text-slate-300 hover:text-indigo-400 hover:bg-indigo-900/20' : 'text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'}`}>
             <i className="fa-solid fa-bell"></i>
             <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
           </button>

           {showNotifications && (
             <div role="dialog" aria-label="Notifications" className={`absolute right-0 mt-3 w-80 max-h-80 overflow-auto rounded-xl shadow-2xl z-50 ${isDark ? 'bg-slate-800 border border-slate-700 text-slate-100' : 'bg-white border border-slate-100 text-slate-900'}`}>
               <div className="p-4 border-b" style={{ borderColor: isDark ? 'rgba(148,163,184,0.06)' : undefined }}>
                 <div className="flex items-center justify-between">
                   <strong className="text-sm">Notifications</strong>
                   <button onClick={() => setShowNotifications(false)} className="text-xs text-slate-400 hover:text-slate-600">Close</button>
                 </div>
               </div>
               <ul className="p-3 space-y-2">
                 {notificationsList.length === 0 && (
                   <li className="text-xs text-slate-400 p-3">No notifications</li>
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
                 <button className="text-indigo-600 hover:underline">See all notifications</button>
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
               <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Manage profile</p>
            </div>
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} className={`w-9 h-9 rounded-xl shadow-sm transition-all group-hover:ring-indigo-100 ${isDark ? 'bg-slate-700 ring-2 ring-slate-800' : 'bg-slate-100 ring-2 ring-white'}`} alt="avatar" />
         </button>
      </div>
    </header>
  );
};

export default Header;
