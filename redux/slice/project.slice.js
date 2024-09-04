import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
  const response = await axios.get("http://localhost:3000/project");
  return response.data;
});

export const fetchProjectByIdAsync = createAsyncThunk(
  'projects/fetchProjectByIdAsync',
  async (id) => {
    const response = await axios.get(`http://localhost:3000/project/${id}`);
    return response.data;
  }
);

export const deleteProjectAsync = createAsyncThunk("projects/deleteProject", async (id) => {
  await axios.delete(`http://localhost:3000/project/${id}`);
  return id;
});

export const updateProjectAsync = createAsyncThunk(
  "projects/updateProject",
  async ({ id, updatedProjectData }) => {
    const response = await axios.put(`http://localhost:3000/project/${id}`, updatedProjectData);
    return response.data;
  }
);

export const addProjectAsync = createAsyncThunk(
  "projects/addProject",
  async (newProject) => {
    const response = await axios.post("http://localhost:3000/project", newProject);
    return response.data;
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    project: {},
    projects: [],
    loading: false,
    error: null,
  },
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
        state.error = action.error.message;
      })
      .addCase(fetchProjectByIdAsync.fulfilled, (state, action) => {
        state.project = action.payload;
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project.id !== action.payload);
      })
      .addCase(updateProjectAsync.fulfilled, (state, action) => {
        const index = state.projects.findIndex((project) => project.id === action.payload.id);
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      })
      .addCase(addProjectAsync.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      });
  },
});

export default projectSlice.reducer;
