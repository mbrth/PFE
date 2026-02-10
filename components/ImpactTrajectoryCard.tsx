import React, { useState } from 'react';

interface ImpactTrajectoryCardProps {
  isDark?: boolean;
}

const ImpactTrajectoryCard: React.FC<ImpactTrajectoryCardProps> = ({ isDark: propIsDark }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  
  const isDark = typeof propIsDark === 'boolean' ? propIsDark : (typeof window !== 'undefined' && localStorage.getItem('themeDark') === 'true');

  // Données mockées
  const data = {
    mainGrade: 'A+',
    trajectory: 'responsable', // 'responsable' | 'ajuster'
    lastDecisionImpact: 8, // positif = +, négatif = -
    fromGrade: 'A',
    toGrade: 'A+',
    progressPercent: 75,
    co2: 2.4,
    sovereignty: 92,
    ethicsStatus: 'stable' // 'stable' | 'improving' | 'declining'
  };

  const trajectoryColor = data.trajectory === 'responsable' ? 'text-emerald-600' : 'text-amber-600';
  const trajectoryLabel = data.trajectory === 'responsable' ? 'Trajectoire responsable' : 'Trajectoire à ajuster';
  const impactColor = data.lastDecisionImpact >= 0 ? 'text-emerald-600' : 'text-amber-600';
  const impactSign = data.lastDecisionImpact >= 0 ? '+' : '';

  const ethicsIcon = data.ethicsStatus === 'stable' ? 'fa-minus' : data.ethicsStatus === 'improving' ? 'fa-arrow-up' : 'fa-arrow-down';
  const ethicsColor = data.ethicsStatus === 'stable' ? 'text-slate-400' : data.ethicsStatus === 'improving' ? 'text-emerald-500' : 'text-amber-500';

  return (
    <div 
      className={`relative rounded-[2.5rem] p-8 overflow-hidden transition-all duration-300 cursor-pointer group ${
        isDark 
          ? 'bg-gradient-to-br from-indigo-900 to-indigo-800 border border-indigo-700/50' 
          : 'bg-gradient-to-br from-indigo-600 via-indigo-500 to-slate-900 border border-indigo-400/30'
      }`}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      {/* Decorative accents */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl"></div>

      {/* Content */}
      <div className="relative z-10 space-y-6">
        
        {/* Header */}
        <div>
          <p className="text-[10px] font-black text-white/60 uppercase tracking-widest mb-3">Maturité globale</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black text-white">{data.mainGrade}</span>
            <span className={`text-[11px] font-bold ${trajectoryColor} uppercase tracking-wider`}>{trajectoryLabel}</span>
          </div>
        </div>

        {/* Last Decision Impact */}
        <div className="space-y-1">
          <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Dernière décision</p>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-black ${impactColor}`}>{impactSign}{Math.abs(data.lastDecisionImpact)}%</span>
            <span className="text-[9px] text-white/40">Impact</span>
            <i className={`fa-solid fa-arrow-${data.lastDecisionImpact >= 0 ? 'up' : 'down'} text-xs ${impactColor} opacity-60`}></i>
          </div>
        </div>

        {/* Grade Progression Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-white/50">{data.fromGrade} → {data.toGrade}</span>
            <span className="text-[9px] font-bold text-white/40">{data.progressPercent}%</span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-300 to-emerald-300 rounded-full transition-all duration-1000"
              style={{ width: `${data.progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="pt-2 flex items-center justify-between text-[9px]">
          <span className="text-white/40 font-bold uppercase">Paramètres clés</span>
          <i className="fa-solid fa-arrow-right text-white/30 text-[8px]"></i>
        </div>
      </div>

      {/* Hover Overlay */}
      <div 
        className={`absolute inset-0 rounded-[2.5rem] p-8 bg-slate-900/80 backdrop-blur-sm transition-all duration-300 flex flex-col justify-center items-center z-20 ${
          showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="space-y-4 w-full">
          {/* CO2 */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <i className="fa-solid fa-leaf text-emerald-400 text-xs"></i>
              </div>
              <span className="text-[10px] font-bold text-white/70 uppercase">CO₂</span>
            </div>
            <span className="text-sm font-black text-emerald-400">{data.co2}kg</span>
          </div>

          {/* Souveraineté */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-400/20 flex items-center justify-center">
                <i className="fa-solid fa-shield-halved text-indigo-300 text-xs"></i>
              </div>
              <span className="text-[10px] font-bold text-white/70 uppercase">Souveraineté</span>
            </div>
            <span className="text-sm font-black text-indigo-300">{data.sovereignty}pts</span>
          </div>

          {/* Éthique */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400/20 flex items-center justify-center">
                <i className={`fa-solid ${ethicsIcon} ${ethicsColor} text-xs`}></i>
              </div>
              <span className="text-[10px] font-bold text-white/70 uppercase">Éthique</span>
            </div>
            <span className={`text-xs font-black capitalize ${ethicsColor}`}>{data.ethicsStatus}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactTrajectoryCard;
