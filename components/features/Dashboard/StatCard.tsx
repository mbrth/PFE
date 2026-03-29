
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  unit: string;
  trend: string;
  icon: string;
  color: string;
  isDark?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, unit, trend, icon, color, isDark }) => {
  const bgClass = isDark ? 'bg-base-bg/5 border border-base-bg/10 text-base-bg' : 'bg-white border border-ink/5 text-ink';
  const mutedTextClass = isDark ? 'text-base-bg/50' : 'text-ink/40';
  
  // Custom mapping for colors to our eco-theme
  let iconColorClass = 'text-sage';
  let iconBgClass = isDark ? 'bg-sage/20' : 'bg-sage-light/50';
  
  if (color.includes('emerald')) {
    iconColorClass = 'text-sage';
    iconBgClass = isDark ? 'bg-sage/20' : 'bg-sage-light/50';
  } else if (color.includes('indigo')) {
    iconColorClass = isDark ? 'text-sand' : 'text-sand-dark';
    iconBgClass = isDark ? 'bg-sand/20' : 'bg-sand';
  } else if (color.includes('amber')) {
    iconColorClass = 'text-clay';
    iconBgClass = isDark ? 'bg-clay/20' : 'bg-clay/20';
  } else if (color.includes('blue')) {
    iconColorClass = isDark ? 'text-base-bg' : 'text-ink';
    iconBgClass = isDark ? 'bg-base-bg/10' : 'bg-ink/5';
  }

  const trendIsPositive = trend.startsWith('+');
  const trendClass = trendIsPositive 
    ? (isDark ? 'bg-sage/20 text-sage' : 'bg-sage-light/50 text-sage')
    : (isDark ? 'bg-base-bg/10 text-base-bg/50' : 'bg-ink/5 text-ink/50');

  return (
    <div className={`${bgClass} p-6 md:p-8 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
      <div className="flex items-center justify-between mb-8">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${iconBgClass} ${iconColorClass} text-2xl`}>
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest ${trendClass}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-2 ${mutedTextClass}`}>{label}</p>
        <div className="flex items-baseline gap-2">
           <span className="text-4xl font-black">{value}</span>
           <span className={`text-[10px] font-bold uppercase tracking-widest ${mutedTextClass}`}>{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
