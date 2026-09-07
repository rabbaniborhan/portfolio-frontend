import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
}

const initialState: ProductState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await api.get("/products");
  return res.data.products || [];
});

export const fetchProductById = createAsyncThunk("products/fetchProductById", async (id: string) => {
  const res = await api.get(`/products/${id}`);
  return res.data.product;
});

export const createProduct = createAsyncThunk("products/createProduct", async (data: Partial<Product>, { dispatch }) => {
  const res = await api.post("/products", data);
  dispatch(fetchProducts());
  return res.data.product;
});

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: { id: string; data: Partial<Product> }, { dispatch }) => {
    const res = await api.put(`/products/${id}`, data);
    dispatch(fetchProducts());
    return res.data.product;
  }
);

export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id: string, { dispatch }) => {
  await api.delete(`/products/${id}`);
  dispatch(fetchProducts());
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Product not found";
      });
  },
});

export default productSlice.reducer;
