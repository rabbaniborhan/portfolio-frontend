import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export interface Project {
  _id: string;
  title: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  thumbnail: string;
  demoUrl?: string;
  githubUrl?: string;
  category: string;
  featured: boolean;
  contribution?: string;
  challenges?: string;
  status: string;
}

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const res = await api.get("/projects");
  return res.data.data || [];
});

export const fetchProjectById = createAsyncThunk("projects/fetchProjectById", async (id: string) => {
  const res = await api.get(`/projects/${id}`);
  return res.data.data;
});

export const createProject = createAsyncThunk("projects/createProject", async (data: Partial<Project>, { dispatch }) => {
  const res = await api.post("/projects", data);
  dispatch(fetchProjects());
  return res.data.data;
});

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ id, data }: { id: string; data: Partial<Project> }, { dispatch }) => {
    const res = await api.put(`/projects/${id}`, data);
    dispatch(fetchProjects());
    return res.data.data;
  }
);

export const deleteProject = createAsyncThunk("projects/deleteProject", async (id: string, { dispatch }) => {
  await api.delete(`/projects/${id}`);
  dispatch(fetchProjects());
  return id;
});

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch projects";
      })
      .addCase(fetchProjectById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProjectById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Project not found";
      });
  },
});

export default projectSlice.reducer;
