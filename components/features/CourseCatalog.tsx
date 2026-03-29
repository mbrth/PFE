import React from 'react';
import CourseCard from '../ui/CourseCard';
import { useCourses } from '../../hooks/useCourses';
import { UserRole, Course } from '../../types';

interface CourseCatalogProps {
  search: string;
  isDark: boolean;
  userRole?: UserRole;
  onSelectCourse: (course: Course) => void;
}

/**
 * Browsable catalog of eco-certified training modules.
 * Selecting a course triggers the detailed curriculum viewer.
 */
const CourseCatalog: React.FC<CourseCatalogProps> = ({ search, isDark, userRole, onSelectCourse }) => {
  const { courses: filteredCourses } = useCourses(search, userRole);

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="section-header">
        <div className="space-y-4">
          <div className="badge-eco">
            <i className="fa-solid fa-layer-group"></i>
            Catalogue
          </div>
          <h1 className="title-main">
            Parcours <span className="text-sage italic font-serif font-normal">Certifiés</span>
          </h1>
          <p className="text-muted text-base max-w-xl">
            Découvrez nos formations auditées pour leur impact carbone et leur niveau de souveraineté.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm font-bold text-ink/40">
           <span>{filteredCourses.length} modules disponibles</span>
        </div>
      </div>
      
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCourses.map(course => (
            <div 
              key={course.id} 
              className="relative group cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => onSelectCourse(course)}
            >
              {!course.isValidated && (
                <div className="absolute -top-3 -right-3 z-10 bg-amber-500 text-white text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                  En attente
                </div>
              )}
              <CourseCard course={course} isDark={isDark} />
            </div>
          ))}
        </div>
      ) : (
        <div className={`p-16 text-center rounded-[3rem] border border-dashed ${isDark ? 'border-base-bg/20 text-base-bg/40' : 'border-ink/20 text-ink/40'}`}>
           <i className="fa-solid fa-ghost text-6xl mb-6 opacity-20"></i>
           <p className="text-xl font-bold">Aucun parcours trouvé.</p>
           <p className="text-sm mt-2">Essayez d'autres mots-clés de recherche.</p>
        </div>
      )}
    </div>
  );
};

export default CourseCatalog;
