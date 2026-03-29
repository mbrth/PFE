
import React, { useState } from 'react';

interface WelcomeBannerProps {
  isDark?: boolean;
  trajectoryData: {
    mainGrade: string;
    trajectory: string;
    lastDecisionImpact: number;
    fromGrade: string;
    toGrade: string;
    progressPercent: number;
    co2: number;
    sovereignty: number;
    ethicsStatus: string;
  };
}

const WelcomeBanner: React.FC<WelcomeBannerProps> = ({ isDark, trajectoryData }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const trajectoryColor = trajectoryData.trajectory === 'responsable' ? 'text-sage' : 'text-clay';
  const trajectoryLabel = trajectoryData.trajectory === 'responsable' ? 'Trajectoire Responsable' : 'Ajustement Requis';
  const impactColor = trajectoryData.lastDecisionImpact >= 0 ? 'text-sage' : 'text-clay';
  const impactSign = trajectoryData.lastDecisionImpact >= 0 ? '+' : '';
  const ethicsIcon = trajectoryData.ethicsStatus === 'stable' ? 'fa-minus' : trajectoryData.ethicsStatus === 'improving' ? 'fa-arrow-up' : 'fa-arrow-down';
  const ethicsColor = trajectoryData.ethicsStatus === 'stable' ? 'text-sand-dark' : trajectoryData.ethicsStatus === 'improving' ? 'text-sage' : 'text-clay';

  const containerBg = isDark ? 'bg-base-bg/10 text-base-bg border border-base-bg/10' : 'bg-ink text-white shadow-2xl shadow-ink/20';

  return (
    <div className={`relative rounded-[3rem] p-8 md:p-12 overflow-hidden group ${containerBg}`}>
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
         <i className="fa-solid fa-code absolute top-10 left-10 text-6xl text-white"></i>
         <i className="fa-solid fa-seedling absolute bottom-10 right-20 text-8xl text-white"></i>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div className="lg:col-span-2 space-y-6">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
             <span className="w-2 h-2 bg-sage rounded-full animate-pulse"></span>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Analyse en temps réel</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
            Pilotez votre <br/><span className="text-sage italic font-serif font-normal">Impact Numérique.</span>
          </h1>
          <p className="text-white/70 text-lg leading-relaxed max-w-xl">
            Vos choix d'architecture et de code influencent directement l'indice de maturité de vos projets. Continuez pour atteindre la certification "Éco-Développeur".
          </p>
        </div>

        <div 
          className="relative lg:col-span-1 bg-white/5 backdrop-blur-sm rounded-[2rem] p-8 border border-white/10 cursor-pointer transition-all duration-500 hover:bg-white/10 group/card"
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
        >
          <div className="space-y-4">
            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest">Maturité Globale</p>
            <div className="flex items-baseline gap-4">
              <span className="text-6xl font-black text-white">{trajectoryData.mainGrade}</span>
              <span className={`text-[10px] font-bold ${trajectoryColor} uppercase tracking-widest`}>{trajectoryLabel}</span>
            </div>
          </div>

          <div className="space-y-2 mt-8">
            <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest">Dernier Commit</p>
            <div className="flex items-center gap-3">
              <span className={`text-xl font-black ${impactColor}`}>{impactSign}{Math.abs(trajectoryData.lastDecisionImpact)}%</span>
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">d'efficacité</span>
              <i className={`fa-solid fa-arrow-${trajectoryData.lastDecisionImpact >= 0 ? 'up' : 'down'} text-sm ${impactColor}`}></i>
            </div>
          </div>

          <div className="space-y-3 mt-8">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/50">{trajectoryData.fromGrade} → {trajectoryData.toGrade}</span>
              <span className="text-[10px] font-bold text-white/50">{trajectoryData.progressPercent}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-sage rounded-full transition-all duration-1000"
                style={{ width: `${trajectoryData.progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div 
            className={`absolute inset-0 rounded-[2rem] p-8 bg-ink/95 backdrop-blur-md transition-all duration-500 flex flex-col justify-center z-20 ${showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="space-y-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sage/20 flex items-center justify-center text-sage">
                    <i className="fa-solid fa-leaf text-sm"></i>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">CO₂</span>
                </div>
                <span className="font-black text-lg text-sage">{trajectoryData.co2}kg</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sand/20 flex items-center justify-center text-sand">
                    <i className="fa-solid fa-shield-halved text-sm"></i>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Souveraineté</span>
                </div>
                <span className="font-black text-lg text-sand">{trajectoryData.sovereignty}pts</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center ${ethicsColor}`}>
                    <i className={`fa-solid ${ethicsIcon} text-sm`}></i>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest">Éthique IA</span>
                </div>
                <span className={`font-black text-sm uppercase tracking-widest ${ethicsColor}`}>{trajectoryData.ethicsStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
