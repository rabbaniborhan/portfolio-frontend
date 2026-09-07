import { create } from "zustand";
import api from "@/lib/api";

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  bannerImage?: string;
  categories: string[];
  published: boolean;
  createdAt?: string;
}

interface BlogState {
  posts: BlogPost[];
  currentPost: BlogPost | null;
  loading: boolean;
  error: string | null;

  // Simple CRUD
  getAll: () => Promise<void>;
  getById: (id: string) => Promise<BlogPost | null>;
  create: (data: Partial<BlogPost>) => Promise<boolean>;
  update: (id: string, data: Partial<BlogPost>) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}

export const useBlogStore = create<BlogState>((set, get) => ({
  posts: [],
  currentPost: null,
  loading: false,
  error: null,

  getAll: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/blog");
      if (res.data.success) {
        set({ posts: res.data.posts || [] });
      }
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch blog posts" });
    } finally {
      set({ loading: false });
    }
  },

  getById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/blog/${id}`);
      if (res.data.success) {
        set({ currentPost: res.data.post });
        return res.data.post;
      }
      return null;
    } catch (err: any) {
      set({ error: err.message || "Post not found" });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/blog", data);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to create blog post" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/blog/${id}`, data);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to update blog post" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  delete: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete(`/blog/${id}`);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to delete blog post" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
