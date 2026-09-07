import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/api";

export interface Skill {
  _id: string;
  name: string;
  category: string;
  proficiency: number;
  icon?: string;
  order: number;
}

interface SkillState {
  skills: Skill[];
  loading: boolean;
  error: string | null;
}

const initialState: SkillState = {
  skills: [],
  loading: false,
  error: null,
};

export const fetchSkills = createAsyncThunk("skills/fetchSkills", async () => {
  const res = await api.get("/skills");
  return res.data.data || [];
});

export const createSkill = createAsyncThunk("skills/createSkill", async (data: Partial<Skill>, { dispatch }) => {
  const res = await api.post("/skills", data);
  dispatch(fetchSkills());
  return res.data.data;
});

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({ id, data }: { id: string; data: Partial<Skill> }, { dispatch }) => {
    const res = await api.put(`/skills/${id}`, data);
    dispatch(fetchSkills());
    return res.data.data;
  }
);

export const deleteSkill = createAsyncThunk("skills/deleteSkill", async (id: string, { dispatch }) => {
  await api.delete(`/skills/${id}`);
  dispatch(fetchSkills());
  return id;
});

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch skills";
      });
  },
});

export default skillSlice.reducer;
