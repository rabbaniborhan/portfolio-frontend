import { create } from "zustand";
import api from "@/lib/api";

export interface AboutInfo {
  _id?: string;
  name?: string;
  title?: string;
  bio?: string;
  avatarUrl?: string;
  resumeUrl?: string;
  social?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
  experienceYears?: number;
}

interface AboutState {
  about: AboutInfo | null;
  loading: boolean;
  error: string | null;
  fetchAbout: () => Promise<void>;
}

export const useAboutStore = create<AboutState>((set) => ({
  about: null,
  loading: false,
  error: null,

  fetchAbout: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/about");
      if (res.data.success) {
        set({ about: res.data.data });
      } else {
        set({ error: res.data.message || "Failed to load about info" });
      }
    } catch (err: any) {
      set({ error: err.message || "Error loading about info" });
    } finally {
      set({ loading: false });
    }
  },
}));
