import { create } from "zustand";
import api from "@/lib/api";

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatarUrl?: string;
  rating?: number;
}

interface TestimonialState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  fetchTestimonials: () => Promise<void>;
}

export const useTestimonialStore = create<TestimonialState>((set) => ({
  testimonials: [],
  loading: false,
  error: null,

  fetchTestimonials: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/testimonial");
      if (res.data.success) {
        set({ testimonials: res.data.data || [] });
      } else {
        set({ error: res.data.message || "Failed to load testimonials" });
      }
    } catch (err: any) {
      set({ error: err.message || "Error loading testimonials" });
    } finally {
      set({ loading: false });
    }
  },
}));
