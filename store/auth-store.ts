import { create } from "zustand";
import api from "../lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER";
  profileImage?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  checked: boolean;
  setUser: (user: User | null) => void;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  checked: false,
  setUser: (user) => set({ user }),
  checkAuth: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/auth/me");
      if (res.data.success) {
        set({ user: res.data.user, checked: true });
      } else {
        set({ user: null, checked: true });
      }
    } catch {
      set({ user: null, checked: true });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (e) {
      console.error(e);
    }
    set({ user: null });
  },
}));
