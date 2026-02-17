
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

  const trajectoryColor = trajectoryData.trajectory === 'responsable' ? 'text-emerald-400' : 'text-amber-400';
  const trajectoryLabel = trajectoryData.trajectory === 'responsable' ? 'Responsible Trajectory' : 'Adjust Trajectory';
  const impactColor = trajectoryData.lastDecisionImpact >= 0 ? 'text-emerald-400' : 'text-amber-400';
  const impactSign = trajectoryData.lastDecisionImpact >= 0 ? '+' : '';
  const ethicsIcon = trajectoryData.ethicsStatus === 'stable' ? 'fa-minus' : trajectoryData.ethicsStatus === 'improving' ? 'fa-arrow-up' : 'fa-arrow-down';
  const ethicsColor = trajectoryData.ethicsStatus === 'stable' ? 'text-slate-400' : trajectoryData.ethicsStatus === 'improving' ? 'text-emerald-500' : 'text-amber-500';

  return (
    <div className={`relative rounded-[2rem] p-6 md:p-8 lg:p-12 text-white shadow-2xl overflow-hidden group ${isDark ? 'bg-slate-800 shadow-slate-900/40' : 'bg-indigo-600 shadow-indigo-200'}`}>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
             <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
             <span className="text-[10px] font-black uppercase tracking-widest text-white/80 italic">Real-time analysis</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-none">
            Manage your impact <br/><span className="text-indigo-200">and your sovereignty.</span>
          </h1>
          <p className="text-indigo-100/80 text-sm leading-relaxed">
            Your training choices directly influence your profile's digital maturity index. 
            Keep going to reach the "Senior Eco-Architect" grade.
          </p>
        </div>

        <div 
          className="relative lg:col-span-1 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-6 border border-white/10 cursor-pointer transition-all duration-300 group/card"
          onMouseEnter={() => setShowOverlay(true)}
          onMouseLeave={() => setShowOverlay(false)}
        >
          <div className="space-y-3">
            <p className="text-[9px] font-black text-white/60 uppercase tracking-widest">Global Maturity</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-white">{trajectoryData.mainGrade}</span>
              <span className={`text-[10px] font-bold ${trajectoryColor} uppercase tracking-wider`}>{trajectoryLabel}</span>
            </div>
          </div>

          <div className="space-y-1 mt-4">
            <p className="text-[8px] font-bold text-white/50 uppercase tracking-widest">Last Decision</p>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-black ${impactColor}`}>{impactSign}{Math.abs(trajectoryData.lastDecisionImpact)}%</span>
              <span className="text-[8px] text-white/40">Impact</span>
              <i className={`fa-solid fa-arrow-${trajectoryData.lastDecisionImpact >= 0 ? 'up' : 'down'} text-xs ${impactColor} opacity-60`}></i>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between">
              <span className="text-[8px] font-bold text-white/50">{trajectoryData.fromGrade} → {trajectoryData.toGrade}</span>
              <span className="text-[8px] font-bold text-white/40">{trajectoryData.progressPercent}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-300 to-emerald-300 rounded-full transition-all duration-1000"
                style={{ width: `${trajectoryData.progressPercent}%` }}
              ></div>
            </div>
          </div>

          <div 
            className={`absolute inset-0 rounded-2xl p-6 bg-slate-900/90 backdrop-blur-sm transition-all duration-300 flex flex-col justify-center z-20 ${showOverlay ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <div className="space-y-2 text-white">
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-leaf text-emerald-400"></i>
                  <span className="font-bold">CO₂</span>
                </div>
                <span className="font-black text-emerald-400">{trajectoryData.co2}kg</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-shield-halved text-indigo-300"></i>
                  <span className="font-bold">Sovereignty</span>
                </div>
                <span className="font-black text-indigo-300">{trajectoryData.sovereignty}pts</span>
              </div>
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <i className={`fa-solid ${ethicsIcon} ${ethicsColor}`}></i>
                  <span className="font-bold">Ethics</span>
                </div>
                <span className={`font-black capitalize ${ethicsColor}`}>{trajectoryData.ethicsStatus}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-[100px] opacity-50 group-hover:scale-110 transition-transform duration-1000"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500 rounded-full blur-[80px] opacity-30"></div>
    </div>
  );
};

export default WelcomeBanner;
