
import React from 'react';

export interface NavItem {
  id: string;
  icon: string;
  label: string;
  group: string;
}

interface SidebarProps {
  navItems: NavItem[];
  activeTab: string;
  setActiveTab: (id: any) => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  userName: string;
  persona: string;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  activeTab,
  setActiveTab,
  isDrawerOpen,
  setIsDrawerOpen,
  userName,
  persona,
  onLogout
}) => {
  return (
    <>
      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isDrawerOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsDrawerOpen(false)}
        ></div>
        <aside className={`absolute left-0 inset-y-0 w-80 bg-slate-900 shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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

            <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} className="w-12 h-12 rounded-full bg-slate-800" alt="avatar" />
              <div className="overflow-hidden">
                <p className="text-white font-bold text-sm truncate">{userName}</p>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest truncate">{persona}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto">
            {['ANALYTIQUE', 'APPRENTISSAGE', 'CONSEIL'].map(group => (
              <div key={group} className="space-y-2">
                <p className="px-4 text-[10px] font-black text-slate-500 tracking-[0.2em]">{group}</p>
                {navItems.filter(item => item.group === group).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsDrawerOpen(false); }}
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

          <div className="p-6 border-t border-slate-800/50">
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-4 p-4 text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
            >
              <i className="fa-solid fa-power-off text-lg w-6 text-center"></i>
              <span className="font-bold text-sm">Déconnexion</span>
            </button>
          </div>
        </aside>
      </div>

      {/* DESKTOP SIDEBAR */}
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
              onClick={() => setActiveTab(item.id)}
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
          <button onClick={onLogout} className="flex items-center gap-4 p-3 w-full text-slate-400 hover:text-rose-400 transition-all">
            <i className="fa-solid fa-power-off text-lg w-6 text-center"></i>
            <span className="font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">Quitter</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
