import { Course, UserProfile } from '../types';

const API_BASE = '/api';

/**
 * Service layer. 
 * Now relies on Browser Cookies for Authentication (Credentials: true).
 */
export const db = {
  /**
   * Credentials must be 'include' to send/receive HttpOnly cookies.
   */
  getFetchOptions(options: RequestInit = {}): RequestInit {
    return {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    };
  },

  async getCourses(role?: string): Promise<Course[]> {
    try {
      const url = role ? `${API_BASE}/courses?role=${role}` : `${API_BASE}/courses`;
      const res = await fetch(url, this.getFetchOptions());
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  async getCarbonStats() {
    try {
      const res = await fetch(`${API_BASE}/carbon-stats`, this.getFetchOptions());
      if (!res.ok) return { totalConsumed: 0, totalSaved: 0, aiRequestsCount: 0 };
      return await res.json();
    } catch (err) {
      return { totalConsumed: 0, totalSaved: 0, aiRequestsCount: 0 };
    }
  },

  async getSkillsAnalytics() {
    try {
      const res = await fetch(`${API_BASE}/analytics/skills`, this.getFetchOptions());
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      return [];
    }
  },

  async logLessonView() {
    try {
      await fetch(`${API_BASE}/courses/log-view`, this.getFetchOptions({ method: 'POST' }));
    } catch (err) {}
  },

  async getCourseProgress(courseId: string) {
    try {
      const res = await fetch(`${API_BASE}/progress/${courseId}`, this.getFetchOptions());
      if (!res.ok) return [];
      return await res.json();
    } catch (err) { return []; }
  },

  async markLessonCompleted(courseId: string, lessonId: string) {
    try {
      await fetch(`${API_BASE}/progress`, this.getFetchOptions({
        method: 'POST',
        body: JSON.stringify({ courseId, lessonId })
      }));
    } catch (err) {}
  },

  async createCourse(courseData: Partial<Course>) {
    const res = await fetch(`${API_BASE}/courses`, this.getFetchOptions({
      method: 'POST',
      body: JSON.stringify(courseData)
    }));
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  },

  async validateCourse(id: string) {
    const res = await fetch(`${API_BASE}/courses/${id}/validate`, this.getFetchOptions({ method: 'PATCH' }));
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  },

  async deleteCourse(id: string) {
    const res = await fetch(`${API_BASE}/courses/${id}`, this.getFetchOptions({ method: 'DELETE' }));
    if (!res.ok) throw new Error('Failed');
    return true;
  },

  async updateUserProfile(userId: string, profile: Partial<UserProfile>) {
    const res = await fetch(`${API_BASE}/profile`, this.getFetchOptions({
      method: 'PUT',
      body: JSON.stringify(profile)
    }));
    if (!res.ok) throw new Error('Failed');
    return await res.json();
  },

  auth: {
    async login(email: string, password: string) {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Invalid credentials');
      return await res.json();
    },

    async register(email: string, password: string, full_name: string) {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name }),
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Registration failed');
      return await res.json();
    },

    async logout() {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST', credentials: 'include' });
    },

    async getSession() {
      try {
        const res = await fetch(`${API_BASE}/profile`, { credentials: 'include' });
        if (res.status === 401) return { data: { session: null } };
        if (!res.ok) return { data: { session: null } };
        const user = await res.json();
        return { data: { session: { user } } };
      } catch (err) {
        return { data: { session: null } };
      }
    }
  }
};
