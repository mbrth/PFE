
import React from 'react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  persona: string;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, userName, persona }) => {
  if (!isOpen) return null;

  const badges = [
    { icon: 'fa-seedling', label: 'Eco-Pionnier' },
    { icon: 'fa-shield-halved', label: 'Privacy First' },
    { icon: 'fa-code', label: 'Clean Coder' },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Panel */}
      <div className="relative w-full max-w-sm md:max-w-md h-full bg-ink shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col">
        
        {/* Header (Now naturally adopts the panel's ink background) */}
        <div className="relative p-8 overflow-hidden shrink-0 text-white">
          {/* Decorative */}
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-sage/20 rounded-full blur-3xl"></div>
          
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-xl transition-all text-white z-20"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="relative z-10 mt-4">
            <div className="flex items-center gap-5 mb-6">
              <div className="relative">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
                  className="w-20 h-20 rounded-3xl bg-base-bg shadow-lg border-2 border-ink" 
                  alt="avatar"
                />
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-sage rounded-xl flex items-center justify-center shadow-md border-2 border-ink">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-2xl font-black text-white truncate">{userName}</h3>
                <p className="text-sage-light text-[10px] font-black uppercase tracking-widest truncate">{persona}</p>
              </div>
            </div>

            {/* Quick badges */}
            <div className="flex gap-2 flex-wrap">
              {badges.slice(0, 2).map((badge, idx) => (
                <span key={idx} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-xl border border-white/10 text-[9px] font-black text-white uppercase tracking-widest">
                  <i className={`fa-solid ${badge.icon} text-sage`}></i>
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scrollable Content (Light background overlaid on top) */}
        <div className="flex-1 flex flex-col bg-white rounded-tl-[2.5rem] mt-2 overflow-hidden">
          <div className="p-8 space-y-8 flex-1 overflow-y-auto">
            
            {/* Main KPIs */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-sage/10 p-5 rounded-[2rem] border border-sage/20 text-center">
                <p className="text-[9px] font-black text-sage uppercase tracking-widest mb-2">Grade</p>
                <p className="text-3xl font-black text-ink">A+</p>
              </div>
              <div className="bg-sand/20 p-5 rounded-[2rem] border border-sand/30 text-center">
                <p className="text-[9px] font-black text-sand-dark uppercase tracking-widest mb-2">Sov</p>
                <p className="text-3xl font-black text-ink">94%</p>
              </div>
              <div className="bg-clay/10 p-5 rounded-[2rem] border border-clay/20 text-center">
                <p className="text-[9px] font-black text-clay uppercase tracking-widest mb-2">Lvl</p>
                <p className="text-3xl font-black text-ink">12</p>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-3 p-6 bg-base-bg rounded-[2.5rem] border border-ink/5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-black text-ink/40 uppercase tracking-widest">Maturité</p>
                <p className="text-[10px] font-black text-ink">740/1000 XP</p>
              </div>
              <div className="h-2 bg-ink/5 rounded-full overflow-hidden">
                <div className="h-full bg-sage w-3/4 rounded-full transition-all duration-1000"></div>
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="text-[10px] font-black text-ink/40 uppercase tracking-widest mb-4 flex items-center gap-3">
                <i className="fa-solid fa-code text-sage"></i>
                Compétences clés
              </p>
              <div className="grid grid-cols-2 gap-3">
                {['Green Coding', 'Cloud EU', 'RGPD', 'IA Éthique'].map((skill, i) => (
                  <div key={i} className="px-4 py-3 rounded-2xl bg-base-bg border border-ink/5 hover:border-sage transition-colors group shadow-sm text-center">
                    <p className="text-[10px] font-bold text-ink group-hover:text-sage uppercase tracking-widest">{skill}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="p-8 border-t border-ink/5 bg-white shrink-0 space-y-3">
            <button className="w-full py-4 bg-ink hover:bg-sage text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-ink/10 flex items-center justify-center gap-3">
              <i className="fa-solid fa-sliders"></i> Configurer le profil
            </button>
            <button onClick={onClose} className="w-full py-4 bg-base-bg border border-ink/5 text-ink hover:bg-ink/5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-3">
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Fermer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileModal;
