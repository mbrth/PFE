import { useMemo } from 'react';
import { MOCKED_COURSES } from '../constants';
import { Course } from '../types';

/**
 * Provides filtered course data based on search criteria.
 * This centralization ensures consistent filtering logic across the dashboard and catalog,
 * while optimizing performance through memoization.
 */
export const useCourses = (search: string = '') => {
  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    
    if (!query) return MOCKED_COURSES;

    return MOCKED_COURSES.filter((course: Course) => {
      return (
        course.title.toLowerCase().includes(query) ||
        course.provider.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.skills.some(skill => skill.toLowerCase().includes(query))
      );
    });
  }, [search]);

  return {
    courses: filteredCourses,
    totalCount: MOCKED_COURSES.length,
    filteredCount: filteredCourses.length
  };
};
