import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
}

const initialState: AboutState = {
  about: null,
  loading: false,
  error: null,
};

export const fetchAbout = createAsyncThunk("about/fetchAbout", async () => {
  const res = await api.get("/about");
  return res.data.data;
});

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.about = action.payload;
      })
      .addCase(fetchAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch about info";
      });
  },
});

export default aboutSlice.reducer;
