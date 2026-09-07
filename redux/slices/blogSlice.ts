import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
}

const initialState: BlogState = {
  posts: [],
  currentPost: null,
  loading: false,
  error: null,
};

export const fetchBlogPosts = createAsyncThunk("blog/fetchBlogPosts", async () => {
  const res = await api.get("/blog");
  return res.data.posts || [];
});

export const fetchBlogPostById = createAsyncThunk("blog/fetchBlogPostById", async (id: string) => {
  const res = await api.get(`/blog/${id}`);
  return res.data.post;
});

export const createBlogPost = createAsyncThunk("blog/createBlogPost", async (data: Partial<BlogPost>, { dispatch }) => {
  const res = await api.post("/blog", data);
  dispatch(fetchBlogPosts());
  return res.data.post;
});

export const updateBlogPost = createAsyncThunk(
  "blog/updateBlogPost",
  async ({ id, data }: { id: string; data: Partial<BlogPost> }, { dispatch }) => {
    const res = await api.put(`/blog/${id}`, data);
    dispatch(fetchBlogPosts());
    return res.data.post;
  }
);

export const deleteBlogPost = createAsyncThunk("blog/deleteBlogPost", async (id: string, { dispatch }) => {
  await api.delete(`/blog/${id}`);
  dispatch(fetchBlogPosts());
  return id;
});

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch blog posts";
      })
      .addCase(fetchBlogPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchBlogPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Post not found";
      });
  },
});

export default blogSlice.reducer;
