import { create } from "zustand";
import api from "@/lib/api";

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  order: number;
}

interface SkillState {
  skills: Skill[];
  loading: boolean;
  error: string | null;

  // Simple CRUD
  getAll: () => Promise<void>;
  create: (data: Partial<Skill>) => Promise<boolean>;
  update: (id: string, data: Partial<Skill>) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}

export const useSkillStore = create<SkillState>((set, get) => ({
  skills: [],
  loading: false,
  error: null,

  getAll: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/skills");
      if (res.data.success) {
        set({ skills: res.data.data || [] });
      }
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch skills" });
    } finally {
      set({ loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/skills", data);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to create skill" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/skills/${id}`, data);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to update skill" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  delete: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete(`/skills/${id}`);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to delete skill" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
