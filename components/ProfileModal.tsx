
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
    { icon: 'fa-user-shield', label: 'Privacy First' },
    { icon: 'fa-bolt', label: 'Apprenant Rapide' },
  ];

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop subtle */}
      <div 
        className="absolute inset-0 bg-slate-900/30 animate-in fade-in duration-300"
        onClick={onClose}
      ></div>

      {/* Panel sliding in from top-right */}
      <div className="absolute top-6 right-6 w-full max-w-sm md:max-w-md rounded-3xl shadow-2xl shadow-slate-900/40 overflow-hidden animate-in slide-in-from-top-8 fade-in duration-400 border border-slate-200 bg-white">
        
        {/* Header with gradient background */}
        <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-500 to-slate-900 p-6 overflow-hidden">
          {/* Decorative accent */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>

          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg transition-all text-white"
          >
            <i className="fa-solid fa-xmark text-sm"></i>
          </button>

          {/* Profile Header */}
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`} 
                  className="w-16 h-16 rounded-2xl bg-white shadow-lg" 
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-400 rounded-full flex items-center justify-center shadow-md">
                  <i className="fa-solid fa-check text-white text-[9px]"></i>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-black text-white truncate">{userName}</h3>
                <p className="text-indigo-100 text-[11px] font-bold uppercase tracking-wider truncate">{persona}</p>
              </div>
            </div>

            {/* Quick badges */}
            <div className="flex gap-2 flex-wrap">
              {badges.slice(0, 2).map((badge, idx) => (
                <span key={idx} className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/15 rounded-lg border border-white/20 text-[9px] font-black text-white uppercase">
                  <i className={`fa-solid ${badge.icon} text-indigo-200`}></i>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="p-6 space-y-5 max-h-[calc(100vh-200px)] overflow-y-auto">
          {/* Main KPIs - 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
              <p className="text-[8px] font-black text-emerald-600 uppercase mb-2">Grade</p>
              <p className="text-2xl font-black text-emerald-700">A+</p>
            </div>
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
              <p className="text-[8px] font-black text-indigo-600 uppercase mb-2">Souverain</p>
              <p className="text-2xl font-black text-indigo-700">94%</p>
            </div>
            <div className="bg-amber-50 p-4 rounded-2xl border border-amber-100">
              <p className="text-[8px] font-black text-amber-600 uppercase mb-2">Niveau</p>
              <p className="text-2xl font-black text-amber-700">12</p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-500 uppercase">Maturité</p>
              <p className="text-[10px] font-black text-indigo-600">740/1000 XP</p>
            </div>
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 w-3/4 rounded-full transition-all duration-1000"></div>
            </div>
          </div>

          {/* Skills */}
          <div className="pt-2">
            <p className="text-[10px] font-black text-slate-600 uppercase mb-3 flex items-center gap-2">
              <span className="w-5 h-5 rounded-lg bg-slate-900 text-white flex items-center justify-center text-[8px]">
                <i className="fa-solid fa-sparkles"></i>
              </span>
              Compétences clés
            </p>
            <div className="grid grid-cols-2 gap-2">
              {['Green Coding', 'Cloud EU', 'RGPD', 'IA Éthique'].map((skill, i) => (
                <div key={i} className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors group">
                  <p className="text-[9px] font-black text-slate-700 group-hover:text-indigo-600">{skill}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons - compact */}
          <div className="pt-3 space-y-2">
            <button className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-wide transition-all shadow-md flex items-center justify-center gap-2">
              <i className="fa-solid fa-sliders text-xs"></i> Configurer
            </button>
            <button className="w-full py-2.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl font-black text-[10px] uppercase tracking-wide transition-all flex items-center justify-center gap-2">
              <i className="fa-solid fa-download text-xs"></i> Exporter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
