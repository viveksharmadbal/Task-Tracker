import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async () => {
    const response = await axios.get('http://localhost:3000/employee');
    return response.data;
  }
);

export const deleteEmployeeAsync = createAsyncThunk(
  'employee/deleteEmployee',
  async (id) => {
    await axios.delete(`http://localhost:3000/employee/${id}`);
    return id;
  }
);

export const updateEmployeeAsync = createAsyncThunk(
  'employee/updateEmployee',
  async ({ id, updatedData }) => {
    const response = await axios.put(`http://localhost:3000/employee/${id}`, updatedData);
    return response.data;
  }
);

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteEmployeeAsync.fulfilled, (state, action) => {
        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(updateEmployeeAsync.fulfilled, (state, action) => {
        state.employees = state.employees.map((employee) =>
          employee.id === action.payload.id ? action.payload : employee
        );
      });
  },
});

export default employeeSlice.reducer;
