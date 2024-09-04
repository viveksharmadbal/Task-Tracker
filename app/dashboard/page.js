"use client"
import React, { useEffect } from 'react';
import DashboardCard from '@/components/core/DashboardCard';
import Navbar from '@/components/core/navbar';
import { selectemployeeSummary,selectroleSummary,selectprojectSummary, selectTaskSummary } from '@/redux/selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { fetchEmployees } from '@/redux/slice/employee.slice';
import { fetchProjects } from '@/redux/slice/project.slice';
import { fetchRoles } from '@/redux/slice/role.slice';

const Dashboard = () => {
const employeeSummary=useSelector(selectemployeeSummary)
const roleSummary=useSelector(selectroleSummary)
const projectSummary=useSelector(selectprojectSummary)
const tasksummary=useSelector(selectTaskSummary)
const dispatch=useDispatch()

useEffect(() => {
  dispatch(fetchEmployees());
  dispatch(fetchProjects());
  dispatch(fetchRoles());
  dispatch(fetchTasks());
}, [dispatch]);

const fetchTasks = () => async(dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/task-tracker");
    dispatch(setTasks(response.data));
  } catch (error) {
    console.error("Failed to fetch tasks", error);
  }
};

  return (
    <>
    <Navbar/>
    <div className='DashboardImage'>
      <div className='d-flex justify-content-center mx-4 mt-4 justify-content-around '>
      <DashboardCard
        title="Employee List"
        count={employeeSummary.totalEmployees}
        description="View and manage employee details."
        link="/employee"
        color="bg-primary text-light"
      />
      <DashboardCard
        title="Project Management"
        count={projectSummary.totalProjects}
        description="View and manage projects."
        link="/project"
        color="bg-primary text-light"
      />
      <DashboardCard
        title="Role Management"
        count={roleSummary.totalRoles}
        description="View and manage roles."
        link="/role"
        color="bg-primary text-light"
      />
      <DashboardCard
        title="Task Tracker"
        count={tasksummary.totalTasks}
        description="View and manage tasks."
        link="/task-tracker"
        color="bg-primary text-light"
      />
      </div>
    </div>
    </>
  );
};

export default Dashboard;
