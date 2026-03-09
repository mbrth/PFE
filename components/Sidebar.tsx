
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
  isDark?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  navItems,
  activeTab,
  setActiveTab,
  isDrawerOpen,
  setIsDrawerOpen,
  userName,
  persona,
  onLogout,
  isDark
}) => {
  const bgClass = isDark ? 'bg-ink' : 'bg-white';
  const textClass = isDark ? 'text-base-bg' : 'text-ink';
  const mutedTextClass = isDark ? 'text-base-bg/50' : 'text-ink/50';
  const borderClass = isDark ? 'border-base-bg/10' : 'border-ink/5';
  const hoverClass = isDark ? 'hover:bg-base-bg/10 hover:text-base-bg' : 'hover:bg-base-bg hover:text-ink';
  const activeClass = 'bg-sage text-white shadow-md shadow-sage/30';

  return (
    <>
      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ${isDrawerOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-ink/60 backdrop-blur-sm transition-opacity duration-500 ${isDrawerOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsDrawerOpen(false)}
        ></div>
        <aside className={`absolute left-0 inset-y-0 w-80 ${bgClass} shadow-2xl transform transition-transform duration-500 ease-out flex flex-col ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className={`p-8 border-b ${borderClass}`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage rounded-xl flex items-center justify-center text-white shadow-sm shadow-sage/30">
                  <i className="fa-solid fa-leaf text-xl"></i>
                </div>
                <span className={`${textClass} font-black text-xl tracking-tighter`}>EcoOrient</span>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} className={`w-10 h-10 flex items-center justify-center rounded-xl ${mutedTextClass} ${hoverClass} transition-colors`}>
                 <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div className={`p-4 rounded-2xl border ${borderClass} flex items-center gap-4`}>
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} className={`w-12 h-12 rounded-full ${isDark ? 'bg-base-bg/10' : 'bg-base-bg'}`} alt="avatar" />
              <div className="overflow-hidden">
                <p className={`${textClass} font-bold text-sm truncate`}>{userName}</p>
                <p className={`text-sage text-[10px] font-black uppercase tracking-widest truncate`}>{persona}</p>
              </div>
            </div>
          </div>

          <nav className="flex-1 px-4 py-8 space-y-8 overflow-y-auto">
            {['ANALYTIQUE', 'APPRENTISSAGE', 'ACCOMPAGNEMENT'].map(group => (
              <div key={group} className="space-y-2">
                <p className={`px-4 text-[10px] font-black ${mutedTextClass} tracking-[0.2em]`}>{group}</p>
                {navItems.filter(item => item.group === group).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => { setActiveTab(item.id); setIsDrawerOpen(false); }}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${
                      activeTab === item.id 
                        ? activeClass 
                        : `${mutedTextClass} ${hoverClass}`
                    }`}
                  >
                    <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            ))}
          </nav>

          <div className={`p-6 border-t ${borderClass}`}>
            <button 
              onClick={onLogout}
              className={`w-full flex items-center gap-4 p-4 text-clay hover:bg-clay/10 rounded-2xl transition-all font-bold text-sm`}
            >
              <i className="fa-solid fa-power-off text-lg w-6 text-center"></i>
              <span>Déconnexion</span>
            </button>
          </div>
        </aside>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside 
        className={`hidden lg:flex w-72 ${bgClass} flex-col py-8 px-6 border-r ${borderClass} z-50 fixed inset-y-0 left-0 shadow-sm overflow-y-auto`}
      >
        <div className="flex items-center gap-4 mb-12 px-2 shrink-0">
          <div className="w-12 h-12 bg-sage rounded-2xl flex items-center justify-center text-white shadow-sm shadow-sage/30 shrink-0">
            <i className="fa-solid fa-leaf text-xl"></i>
          </div>
          <span className={`${textClass} font-black text-2xl tracking-tighter`}>EcoOrient</span>
        </div>
        
        <nav className="flex flex-col flex-1 mt-2 shrink-0">
          {['ANALYTIQUE', 'APPRENTISSAGE', 'ACCOMPAGNEMENT'].map(group => (
            <div key={group} className="mb-8 space-y-2">
               <p className={`px-4 text-[10px] font-black ${mutedTextClass} tracking-[0.2em] mb-4`}>{group}</p>
               {navItems.filter(item => item.group === group).map((item) => (
                 <button
                   key={item.id}
                   onClick={() => setActiveTab(item.id)}
                   className={`flex items-center gap-4 p-4 w-full rounded-2xl transition-all font-bold text-sm ${
                     activeTab === item.id ? activeClass : `${mutedTextClass} ${hoverClass}`
                   }`}
                 >
                   <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
                   <span>{item.label}</span>
                 </button>
               ))}
            </div>
          ))}
        </nav>
        
        <div className={`mt-auto pt-6 border-t ${borderClass} shrink-0`}>
          <button onClick={onLogout} className={`flex items-center gap-4 p-4 w-full text-clay hover:bg-clay/10 rounded-2xl transition-all font-bold text-sm`}>
            <i className="fa-solid fa-power-off text-lg w-6 text-center"></i>
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
