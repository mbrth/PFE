
import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isDark?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, isDark: propIsDark }) => {
  const isDark = typeof propIsDark === 'boolean' ? propIsDark : (typeof window !== 'undefined' && localStorage.getItem('themeDark') === 'true');
  const isEcoFriendly = course.ecoScore.carbonFootprint < 1;
  const isSovereign = course.sovereignty.sovereigntyScore > 80;

  return (
    <div className={`group rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden relative ${isDark ? 'bg-slate-800 border border-slate-700 text-slate-100' : 'bg-white border border-slate-100'}`}>
      <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-slate-800/40 to-transparent' : 'bg-gradient-to-br from-indigo-50/30 to-transparent'} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-0`}></div>

      <div className="relative z-10 p-6 md:p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
             <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-colors ${isDark ? 'bg-slate-700 text-slate-300 group-hover:bg-slate-600 group-hover:text-indigo-300' : 'bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'}`}>
                <i className="fa-solid fa-graduation-cap"></i>
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
               {course.category}
             </span>
          </div>
          <div className="flex gap-2">
            {isEcoFriendly && (
              <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm border ${isDark ? 'bg-emerald-900/20 text-emerald-300 border-emerald-800' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                <i className="fa-solid fa-leaf mr-1"></i> Green
              </div>
            )}
            {isSovereign && (
              <div className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter shadow-sm border ${isDark ? 'bg-indigo-900/20 text-indigo-300 border-indigo-800' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                <i className="fa-solid fa-shield-halved mr-1"></i> Sov
              </div>
            )}
          </div>
        </div>
        
        <h3 className={`text-xl font-black mb-3 transition-colors leading-tight ${isDark ? 'text-slate-100 group-hover:text-indigo-300' : 'text-slate-900 group-hover:text-indigo-600'}`}>{course.title}</h3>
        <p className={`text-xs font-medium mb-6 line-clamp-2 leading-relaxed italic ${isDark ? 'text-slate-300' : 'text-slate-400'}`}>
          Opéré par <span className={`${isDark ? 'text-slate-100 font-bold' : 'text-slate-900 font-bold'}`}>{course.provider}</span>
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {course.skills.map((skill, i) => (
            <span key={i} className={`text-[9px] px-3 py-1.5 rounded-xl font-bold border transition-all ${isDark ? 'bg-slate-700 text-slate-300 border-slate-600 group-hover:bg-slate-600 group-hover:text-indigo-300 group-hover:border-indigo-800' : 'bg-slate-50 text-slate-500 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100'}`}>
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-slate-50">
          <div className="space-y-1">
          <p className={`text-[8px] uppercase font-black tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-300'}`}>Impact Carbone</p>
          <div className="flex items-baseline gap-1">
            <span className={`text-sm font-black ${isEcoFriendly ? (isDark ? 'text-emerald-400' : 'text-emerald-600') : (isDark ? 'text-rose-400' : 'text-rose-500')}`}>{course.ecoScore.carbonFootprint}kg</span>
            <span className={`text-[8px] font-bold ${isDark ? 'text-slate-300' : 'text-slate-400'}`}>/CO2</span>
          </div>
         </div>
          <div className="space-y-1">
          <p className={`text-[8px] uppercase font-black tracking-widest ${isDark ? 'text-slate-300' : 'text-slate-300'}`}>Souveraineté</p>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-black ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{course.sovereignty.sovereigntyScore}%</span>
            <div className={`flex-1 h-1 rounded-full overflow-hidden ${isDark ? 'bg-slate-700' : 'bg-slate-100'}`}>
              <div className="h-full bg-indigo-500 transition-all duration-1000" style={{ width: `${course.sovereignty.sovereigntyScore}%` }}></div>
            </div>
          </div>
         </div>
        </div>
      </div>
      
      <div className={`p-4 md:p-6 backdrop-blur-sm flex items-center justify-between relative z-10 border-t ${isDark ? 'bg-slate-900/80 border-slate-700' : 'bg-slate-50/80 border-slate-100'}`}>
        <div className="flex gap-4">
           <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Durée</span>
              <span className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{course.duration}</span>
           </div>
           <div className="w-px h-6 bg-slate-200 self-center"></div>
           <div className="flex flex-col">
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Niveau</span>
              <span className={`text-xs font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{course.level}</span>
           </div>
        </div>
        <button className={`${isDark ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-900/20' : 'bg-slate-900 hover:bg-indigo-600 text-white shadow-xl shadow-slate-900/10'} text-[10px] font-black uppercase tracking-widest py-3.5 px-6 rounded-2xl transition-all flex items-center gap-2 active:scale-95`}>
          Rejoindre <i className="fa-solid fa-chevron-right text-[8px]"></i>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
