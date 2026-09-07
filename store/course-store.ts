import { create } from "zustand";
import api from "@/lib/api";

export interface Course {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  price: number;
  thumbnail: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  duration: string;
  totalLessons: number;
  tags?: string[];
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CourseModule {
  _id: string;
  courseId: string;
  title: string;
  order: number;
}

export interface Lesson {
  _id: string;
  courseId: string;
  moduleId: string;
  title: string;
  content?: string;
  videoUrl?: string;
  duration?: string;
  order: number;
}

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  modules: CourseModule[];
  lessons: Lesson[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  fetchCourseBySlug: (slug: string) => Promise<Course | null>;
  fetchCurriculum: (courseId: string) => Promise<void>;
}

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  currentCourse: null,
  modules: [],
  lessons: [],
  loading: false,
  error: null,

  fetchCourses: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/courses");
      if (res.data.success) {
        set({ courses: res.data.courses || [] });
      } else {
        set({ error: res.data.message || "Failed to load courses" });
      }
    } catch (err: any) {
      set({ error: err.message || "Error loading courses" });
    } finally {
      set({ loading: false });
    }
  },

  fetchCourseBySlug: async (slug: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/courses/slug/${slug}`);
      if (res.data.success) {
        set({ currentCourse: res.data.course });
        return res.data.course;
      }
      return null;
    } catch (err: any) {
      set({ error: err.message || "Course not found" });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  fetchCurriculum: async (courseId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/courses/${courseId}/curriculum`);
      if (res.data.success) {
        set({ modules: res.data.modules || [], lessons: res.data.lessons || [] });
      }
    } catch (err: any) {
      set({ error: err.message || "Error loading curriculum" });
    } finally {
      set({ loading: false });
    }
  },
}));
