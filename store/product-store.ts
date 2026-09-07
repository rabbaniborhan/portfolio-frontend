import { create } from "zustand";
import api from "@/lib/api";

export interface Product {
  _id: string;
  title: string;
  slug: string;
  subtitle?: string;
  description: string;
  price: number;
  discountPrice?: number;
  coverImage?: string;
  type?: string;
  categories: string[];
  published: boolean;
}

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;

  // Simple CRUD
  getAll: () => Promise<void>;
  getById: (id: string) => Promise<Product | null>;
  create: (data: Partial<Product>) => Promise<boolean>;
  update: (id: string, data: Partial<Product>) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  currentProduct: null,
  loading: false,
  error: null,

  getAll: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/products");
      if (res.data.success) {
        set({ products: res.data.products || [] });
      }
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch products" });
    } finally {
      set({ loading: false });
    }
  },

  getById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/products/${id}`);
      if (res.data.success) {
        set({ currentProduct: res.data.product });
        return res.data.product;
      }
      return null;
    } catch (err: any) {
      set({ error: err.message || "Product not found" });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  create: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/products", data);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to create product" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  update: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await api.put(`/products/${id}`, data);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to update product" });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  delete: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await api.delete(`/products/${id}`);
      if (res.data.success) {
        await get().getAll();
        return true;
      }
      return false;
    } catch (err: any) {
      set({ error: err.message || "Failed to delete product" });
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
