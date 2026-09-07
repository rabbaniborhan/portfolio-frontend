import { create } from "zustand";
import api from "@/lib/api";

export interface ContactMessagePayload {
  name: string;
  email: string;
  subject?: string;
  pkg?: string;
  message: string;
}

interface ContactState {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
  submitContact: (payload: ContactMessagePayload) => Promise<boolean>;
  resetSubmitted: () => void;
}

export const useContactStore = create<ContactState>((set) => ({
  submitting: false,
  submitted: false,
  error: null,

  submitContact: async (payload) => {
    set({ submitting: true, error: null });
    try {
      const res = await api.post("/contact", payload);
      if (res.data.success) {
        set({ submitted: true });
        return true;
      } else {
        set({ error: res.data.message || "Failed to send message" });
        return false;
      }
    } catch (err: any) {
      set({ error: err.message || "Error submitting contact form" });
      return false;
    } finally {
      set({ submitting: false });
    }
  },

  resetSubmitted: () => set({ submitted: false, error: null }),
}));
