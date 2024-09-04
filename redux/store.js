import { combineReducers, configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./slice/employee.slice";
import projectSlice from "./slice/project.slice";
import roleSlice from "./slice/role.slice";
import taskSlice from "./slice/task.slice";
import tasktrackerSlice from "./slice/tasktracker.slice";
import loaderSlice from "./slice/loader.slice";
import assignprojectSlice from "./slice/assignproject.slice";

const rootReducer = combineReducers({
  employee: employeeReducer,
  role: roleSlice,
  task: taskSlice,
  loader: loaderSlice,
  tasktracker: tasktrackerSlice,
  project: projectSlice,
  assignproject: assignprojectSlice,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
