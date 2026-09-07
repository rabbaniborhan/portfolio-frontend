import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export interface Testimonial {
  _id: string;
  name: string;
  role?: string;
  position?: string;
  company?: string;
  content?: string;
  message?: string;
  text?: string;
  avatarUrl?: string;
  rating?: number;
}

interface TestimonialState {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  testimonials: [],
  loading: false,
  error: null,
};

export const fetchTestimonials = createAsyncThunk("testimonials/fetchTestimonials", async () => {
  const res = await api.get("/testimonial");
  return res.data.data || [];
});

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch testimonials";
      });
  },
});

export default testimonialSlice.reducer;
