
import React from 'react';
import { MOCKED_COURSES } from '../constants';
import CourseCard from './CourseCard';

interface CourseCatalogProps {
  search: string;
  isDark: boolean;
}

const CourseCatalog: React.FC<CourseCatalogProps> = ({ search, isDark }) => {
  const filteredCourses = MOCKED_COURSES.filter(course => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      course.title.toLowerCase().includes(q) ||
      course.provider.toLowerCase().includes(q) ||
      course.category.toLowerCase().includes(q) ||
      course.skills.some(skill => skill.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Certified Paths</h1>
          <p className="text-slate-500 text-sm">Discover courses audited for their impact and sovereignty.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} isDark={isDark} />
        ))}
      </div>
    </div>
  );
};

export default CourseCatalog;
