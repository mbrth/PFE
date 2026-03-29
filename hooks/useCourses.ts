import { useMemo, useState, useEffect } from 'react';
import { MOCKED_COURSES } from '../constants';
import { Course } from '../types';
import { db } from '../services/db';

/**
 * Provides filtered course data based on search criteria.
 * Supports role-based fetching to show non-validated courses to managers.
 */
export const useCourses = (search: string = '', role?: string) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCourses = async () => {
      setLoading(true);
      const data = await db.getCourses(role);
      if (data) {
        setCourses(data);
      }
      setLoading(false);
    };

    loadCourses();
  }, [role]);

  const filteredCourses = useMemo(() => {
    const query = search.trim().toLowerCase();
    
    if (!query) return courses;

    return courses.filter((course: Course) => {
      return (
        course.title.toLowerCase().includes(query) ||
        course.provider.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.skills.some(skill => skill.toLowerCase().includes(query))
      );
    });
  }, [search, courses]);

  return {
    courses: filteredCourses,
    loading,
    totalCount: courses.length,
    filteredCount: filteredCourses.length
  };
};
