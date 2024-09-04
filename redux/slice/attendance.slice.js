// import Attendance from "@/app/attendance/page";
// import { createSlice,configureStore, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';

// //thunk to fetch attendance the api 
// export const fetchAttendance = createAsyncThunk(
//  'attendance/fetchAttendance',
//  async () => {
//     const response = await axios.get('http://localhost:3000/employeeAttendance');
//     return response.data;
//   }
// )

// const attendanceSlice = createSlice({
//     name:"attendance",
//     initialState:{
//         attendances:[],
//         loading:false,
//         error:null
//     },
//     reducer:{},extraReducers: (builder) => {
//         builder
//           .addCase(fetchAttendance.pending, (state) => {
//             state.loading = true;
//           })
//           .addCase(fetchAttendance.fulfilled, (state, action) => {
//             state.loading = false;
//             state.employees = action.payload;
//           })
//           .addCase(fetchAttendance.rejected, (state, action) => {
//             state.loading = false;
//             state.error = action.error.message;
//           })
//         },
// })

// export default attendanceSlice.reducer