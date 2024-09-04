import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  assignProjects: [],
};

const assignProjectSlice = createSlice({
  name: 'assignproject',
  initialState,
  reducers: {
    setAssignProjects: (state, action) => {
      state.assignProjects = action.payload;
    },
    addAssignProject: (state, action) => {
      state.assignProjects.push(action.payload);
    },
    updateAssignProject: (state, action) => {
        const { id, updatedAssignProjectData } = action.payload;
        const index = state.assignProjects.findIndex((project) => project.id === id);
        if (index !== -1) {
          state.assignProjects[index] = { ...state.assignProjects[index], ...updatedAssignProjectData };
        }
      },
      
      deleteAssignProject: (state, action) => {
        state.assignProjects = state.assignProjects.filter((assignproject) => assignproject.id !== action.payload);
      },
      
  },
});

export const { setAssignProjects, addAssignProject, updateAssignProject, deleteAssignProject } = assignProjectSlice.actions;

export default assignProjectSlice.reducer;
