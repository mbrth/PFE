
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
  return (
    <div className={`${isDark ? 'bg-slate-800 border-slate-700 text-slate-100' : 'bg-white border border-slate-100 text-slate-900'} p-4 md:p-6 rounded-3xl shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center ${color} text-xl shadow-inner`}>
          <i className={`fa-solid ${icon}`}></i>
        </div>
        <span className={`text-[10px] font-black px-2 py-1 rounded-full ${trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'}`}>
          {trend}
        </span>
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
           <span className="text-2xl font-black">{value}</span>
           <span className="text-[10px] font-bold text-slate-400">{unit}</span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
