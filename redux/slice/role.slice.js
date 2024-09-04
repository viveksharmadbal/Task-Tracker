import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await axios.get("http://localhost:3000/role");
  return response.data;
});

export const deleteRoleAsync = createAsyncThunk("roles/deleteRole", async (id) => {
  await axios.delete(`http://localhost:3000/role/${id}`);
  return id;
});

export const updateRoleAsync = createAsyncThunk(
  "roles/updateRole",
  async ({ id, updatedRoleData }) => {
    const response = await axios.put(`http://localhost:3000/role/${id}`, updatedRoleData);
    return response.data;
  }
);

export const addRoleAsync = createAsyncThunk("roles/addRole", async (newRole) => {
  const response = await axios.post("http://localhost:3000/role", newRole);
  return response.data;
});

const roleSlice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRoleAsync.fulfilled, (state, action) => {
        state.roles = state.roles.filter((role) => role.id !== action.payload);
      })
      .addCase(updateRoleAsync.fulfilled, (state, action) => {
        const index = state.roles.findIndex((role) => role.id === action.payload.id);
        if (index !== -1) {
          state.roles[index] = action.payload;
        }
      })
      .addCase(addRoleAsync.fulfilled, (state, action) => {
        state.roles.push(action.payload);
      });
  },
});

export default roleSlice.reducer;
