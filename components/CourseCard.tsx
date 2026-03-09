import React from 'react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  isDark?: boolean;
}

/**
 * Individual representation of a training module.
 * It highlights the ecological impact (CO2) and sovereignty level 
 * to allow for a quick and informed comparison between courses.
 */
const CourseCard: React.FC<CourseCardProps> = ({ course, isDark: propIsDark }) => {
  const isDark = typeof propIsDark === 'boolean' ? propIsDark : false;
  
  // Logical thresholds to determine the visual highlighting of eco-responsible modules.
  const isEcoFriendly = course.ecoScore.carbonFootprint < 1;
  const isSovereign = course.sovereignty.sovereigntyScore > 80;

  // Visual classes adapted to the current theme to maintain brand identity.
  const bgClass = isDark ? 'bg-base-bg/5 border border-base-bg/10 text-base-bg' : 'bg-white border border-ink/5 text-ink';
  const mutedTextClass = isDark ? 'text-base-bg/50' : 'text-ink/40';

  return (
    <div className={`group rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full overflow-hidden relative ${bgClass}`}>
      {/* Subtle hover effect to increase user engagement */}
      <div className={`absolute inset-0 bg-sage-light/20 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`}></div>

      <div className="relative z-10 p-8 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
             <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-sm transition-colors ${isDark ? 'bg-base-bg/10 text-base-bg' : 'bg-ink/5 text-ink'}`}>
                <i className="fa-solid fa-code"></i>
             </div>
             <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${mutedTextClass}`}>
               {course.category}
             </span>
          </div>
          {/* Recognition badges for certified "responsible" courses */}
          <div className="flex gap-2">
            {isEcoFriendly && (
              <div className={`px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${isDark ? 'bg-sage/20 text-sage' : 'bg-sage/10 text-sage'}`}>
                <i className="fa-solid fa-leaf mr-1"></i> Green
              </div>
            )}
            {isSovereign && (
              <div className={`px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest ${isDark ? 'bg-sand/20 text-sand' : 'bg-sand/30 text-sand-dark'}`}>
                <i className="fa-solid fa-shield-halved mr-1"></i> Sov
              </div>
            )}
          </div>
        </div>
        
        <h3 className={`text-2xl font-black mb-4 transition-colors leading-tight group-hover:text-sage`}>{course.title}</h3>
        <p className={`text-sm font-medium mb-8 leading-relaxed italic ${mutedTextClass}`}>
          Opéré par <span className="font-bold text-inherit">{course.provider}</span>
        </p>

        {/* List of skills to quickly identify the technical value of the module */}
        <div className="flex flex-wrap gap-2 mb-10">
          {course.skills.map((skill, i) => (
            <span key={i} className={`text-[10px] px-3 py-1.5 rounded-xl font-bold border transition-all ${isDark ? 'border-base-bg/10 text-base-bg/60 group-hover:border-sage/30' : 'border-ink/10 text-ink/60 group-hover:border-sage/30'}`}>
              {skill}
            </span>
          ))}
        </div>

        {/* Quantified indicators of the ecological and political impact of the training */}
        <div className={`mt-auto grid grid-cols-2 gap-6 pt-6 border-t ${isDark ? 'border-base-bg/10' : 'border-ink/5'}`}>
          <div className="space-y-2">
            <p className={`text-[9px] uppercase font-black tracking-widest ${mutedTextClass}`}>Impact</p>
            <div className="flex items-baseline gap-1.5">
              <span className={`text-xl font-black ${isEcoFriendly ? 'text-sage' : 'text-clay'}`}>{course.ecoScore.carbonFootprint}</span>
              <span className={`text-[9px] font-bold ${mutedTextClass}`}>kg CO2</span>
            </div>
          </div>
          <div className="space-y-2">
            <p className={`text-[9px] uppercase font-black tracking-widest ${mutedTextClass}`}>Souveraineté</p>
            <div className="flex items-center gap-3">
              <span className="text-xl font-black">{course.sovereignty.sovereigntyScore}%</span>
              <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isDark ? 'bg-base-bg/10' : 'bg-ink/5'}`}>
                <div className="h-full bg-sand transition-all duration-1000" style={{ width: `${course.sovereignty.sovereigntyScore}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer providing administrative details and call to action */}
      <div className={`p-6 backdrop-blur-sm flex items-center justify-between relative z-10 border-t ${isDark ? 'bg-base-bg/5 border-base-bg/10' : 'bg-ink/5 border-ink/5'}`}>
        <div className="flex gap-6">
           <div className="flex flex-col">
              <span className={`text-[9px] font-black uppercase tracking-widest leading-none mb-1.5 ${mutedTextClass}`}>Durée</span>
              <span className="text-xs font-bold">{course.duration}</span>
           </div>
           <div className={`w-px h-6 self-center ${isDark ? 'bg-base-bg/10' : 'bg-ink/10'}`}></div>
           <div className="flex flex-col">
              <span className={`text-[9px] font-black uppercase tracking-widest leading-none mb-1.5 ${mutedTextClass}`}>Niveau</span>
              <span className="text-xs font-bold">{course.level}</span>
           </div>
        </div>
        <button className={`bg-ink text-white group-hover:bg-sage text-[10px] font-black uppercase tracking-widest py-3 px-6 rounded-xl transition-all flex items-center gap-2 active:scale-95 shadow-md`}>
          Rejoindre <i className="fa-solid fa-chevron-right text-[10px]"></i>
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
