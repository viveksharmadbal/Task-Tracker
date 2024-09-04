"use client";
import React, { useState } from "react";
import { InputWithLabel } from "@/components/core/Input";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addTask } from "@/redux/slice/task.slice";
import toast from "react-hot-toast";

const Task = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [task, setTask] = useState({
    taskName: "",
    description: "",
  });

  const taskChangeHandler = (e) => {
    const { name, value } = e.target;
    setTask((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/task', task);
      dispatch(addTask({ ...task, id: response.data.id }));
      toast.success("Role added successfully!", {
        autoClose: 3000,
        style: {
          backgroundColor: 'green',
          color: '#FFF',
          borderRadius: '4px',
          padding: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }
      });
      setTask({
        taskName: "",
        description: "",
      });
      router.push("/task-tracker");
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="max-w-md p-4 bg-white rounded shadow">
        <h2 className="text-center mb-4">Create New Task</h2>
        <form onSubmit={handleSubmit} className="mb-3">
          <InputWithLabel
            label={"Task Name"}
            name={"taskName"}
            isRequired={true}
            state={task}
            onChangeHandler={taskChangeHandler}
          />
          <InputWithLabel
            label={"Description"}
            name={"description"}
            isRequired={true}
            state={task}
            onChangeHandler={taskChangeHandler}
          />
          <button
            type="submit"
            className="btn btn-primary w-100 mt-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Task;
