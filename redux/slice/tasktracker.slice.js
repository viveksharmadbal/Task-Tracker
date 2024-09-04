import { createSlice } from "@reduxjs/toolkit";

const taskTrackerSlice = createSlice({
  name: "tasktracker",
  initialState: {
    taskTrackers: [],
    employees: [],
  },
  reducers: {
    addTaskTracker: (state, action) => {
      state.taskTrackers.push(action.payload);
    },
    deleteTaskTracker: (state, action) => {
      state.taskTrackers = state.taskTrackers.filter(
        (tasktracker) => tasktracker.id !== action.payload
      );
    },
    setTaskTrackers: (state, action) => {
      state.taskTrackers = action.payload;
    },
    updateTaskTracker: (state, action) => {
      const { id, updatedTaskTracker } = action.payload;
      const index = state.taskTrackers.findIndex(
        (project) => project.id === id
      );
      if (index !== -1) {
        state.taskTrackers[index] = {
          ...state.taskTrackers[index],
          ...updatedTaskTracker,
        };
      }
    },
  },
});

export const {
  addTaskTracker,
  deleteTaskTracker,
  setTaskTrackers,
  updateTaskTracker,
} = taskTrackerSlice.actions;

export default taskTrackerSlice.reducer;
