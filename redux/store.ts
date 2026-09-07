import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slices/projectSlice";
import productReducer from "./slices/productSlice";
import blogReducer from "./slices/blogSlice";
import skillReducer from "./slices/skillSlice";
import aboutReducer from "./slices/aboutSlice";
import testimonialReducer from "./slices/testimonialSlice";

export const store = configureStore({
  reducer: {
    projects: projectReducer,
    products: productReducer,
    blog: blogReducer,
    skills: skillReducer,
    about: aboutReducer,
    testimonials: testimonialReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
