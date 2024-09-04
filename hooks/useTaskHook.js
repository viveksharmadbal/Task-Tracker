// hooks/useTasks.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setTasks, deleteTask, updateTask } from "@/redux/slice/task.slice"; 
import { useRouter } from "next/navigation";
import pageRoutes from "@/utils/pageRoutes";
import toast from "react-hot-toast";

export const useTasks = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const tasks = useSelector((state) => state.task.tasks);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [updatedTaskData, setUpdatedTaskData] = useState({
    taskName: '',
    description: ''
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/task');
        dispatch(setTasks(response.data));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleAddTask = () => {
    router.push(pageRoutes.Add_New_Task());    
  };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskToDelete, settaskToDelete] = useState(null);
  
 const confirmDelete = (id) => {
    settaskToDelete(id);
    setShowDeleteModal(true);
  };
 
 
  const handleCancelDelete = () => {
    settaskToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/task/${taskToDelete}`);
      dispatch(deleteTask(taskToDelete));
      toast.success("Task deleted successfully!", {
        autoClose: 3000,
        style: {
          backgroundColor: '#ff0000',
          color: '#FFF',
          borderRadius: '4px',
          padding: '10px',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }
      });
     
        settaskToDelete(null);
        setShowDeleteModal(false);
      

    } catch (error) {
      console.error('Error deleting task:', error);
      toast.error("Failed to delete task.");
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setUpdatedTaskData({
      taskName: task.taskName,
      description: task.description
    });
  };

  const handleUpdate = async (id) => {
    try {
      const { taskName, description } = updatedTaskData;
      const updatedTask = { taskName, description };

      await axios.put(`http://localhost:3000/task/${id}`, updatedTask);
      dispatch(updateTask({ id, taskName, description }));
      toast.success("Employee updated successfully!",{
        autoClose:3000,
        style:{
            backgroundColor: 'green',
            color: '#FFF',
            borderRadius: '4px',
            padding: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'

        }
      });
      setEditingTaskId(null);
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error("Failed to update employee.");
    }
  };

  const handleInputChange = (e) => {
    setUpdatedTaskData({
      ...updatedTaskData,
      [e.target.name]: e.target.value
    });
  };

  const handleViewDetails = (id) => {
    router.push(`/task-tracker/task-details?id=${id}`);
  };

  return {
    tasks,
    handleAddTask,
    handleInputChange,
    handleUpdate,
    handleEdit,
    handleDelete,
    handleViewDetails,
    editingTaskId,
    updatedTaskData,
    confirmDelete,
    handleCancelDelete,
    showDeleteModal  
  };
};
