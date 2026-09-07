import { create } from "zustand";
import api from "@/lib/api";

export interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  thumbnail: string;
  demoUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  contribution?: string;
  challenges?: string;
  status: string;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;

  // Simple CRUD
  getAll: () => Promise<void>;
  getById: (id: string) => Promise<Project | null>;
  create: (data: Partial<Project>) => Promise<boolean>;
  update: (id: string, data: Partial<Project>) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  currentProject: null,
  loading: false,
  error: null,

  getAll: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/projects");
      if (res.data.success) {
        set({ projects: res.data.data || [] });
      }
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch projects" });
    } finally {
      set({ loading: false });
    }
  },

  getById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/projects/${id}`);
      if (res.data.success) {
        set({ currentProject: res.data.data });
        return res.data.data;
      }
      return null;
    } catch (err: any) {
      set({ error: err.message || "Project not found" });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/projects", data);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to create project" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/projects/${id}`, data);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to update project" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  delete: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete(`/projects/${id}`);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to delete project" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
