"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const TaskDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    
    const fetchTaskDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/taskTracker/${id}`);
        setTask(response.data); 
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };

    if (id) {
      fetchTaskDetails();
    }
  }, [id]);

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container my-4">
      <h1 className="display-4 mb-4">Task Details</h1>
      <table className="table table-bordered">
        <tbody>
          <tr>
            <th scope="row">Task ID:</th>
            <td>{task.task_id}</td>
          </tr>
          <tr>
            <th scope="row">Assigned By:</th>
            <td>{task.assigned_by}</td>
          </tr>
          <tr>
            <th scope="row">Assigned To:</th>
            <td>{task.assigned_to}</td>
          </tr>
          <tr>
            <th scope="row">Assigned Date:</th>
            <td>{new Date(task.assigned_date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th scope="row">Start Date:</th>
            <td>{new Date(task.start_date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th scope="row">End Date:</th>
            <td>{new Date(task.end_date).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th scope="row">Status:</th>
            <td>{task.status}</td>
          </tr>
          <tr>
            <th scope="row">Comment:</th>
            <td>{task.comment}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskDetails;
