import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { 
  setTaskTrackers, 
  deleteTaskTracker, 
  updateTaskTracker, 
  addTaskTracker 
} from "@/redux/slice/tasktracker.slice";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { setEmployees } from "@/redux/slice/employee.slice";
import { setTasks } from "@/redux/slice/task.slice";

export const useTaskTrackers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const taskTrackers = useSelector((state) => state.tasktracker.employees);
  const employees = useSelector((state) => state.employee.employees);
  const [editingTaskTrackerId, setEditingTaskTrackerId] = useState(null);
  const [updatedTaskTrackerData, setUpdatedTaskTrackerData] = useState({ 
    task_id: "",
    assignedBy: "",
    assignedTo: "",
    assigned_date: "",
    start_date: "",
    end_date: "",
    status:""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTaskTrackerData, setModalTaskTrackerData] = useState({
      task_id: "",
      assignedBy: "",
      assignedTo: "",
      assigned_date: "",
      start_date: "",
      end_date: "",
      status:""
   
  });
  const tasks = useSelector((state) => state.task.tasks);

  useEffect(() => {
    const fetchTaskTrackers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/taskTracker');
        dispatch(setTaskTrackers(response.data));
      } catch (error) {
        console.error('Error fetching task trackers:', error);
        toast.error("Failed to fetch task trackers.");
      }
    };
    const fetchEmployees = async () => {
        try {
          const response = await axios.get("http://localhost:3000/employee");
          dispatch(setEmployees(response.data)); // Fetch and set employees
        } catch (error) {
          console.error("Error fetching employees:", error);
          toast.error("Failed to fetch employees.");
        }
      };
     
        const fetchTasks = async () => {
          try {
            const response = await axios.get('http://localhost:3000/task');
            dispatch(setTasks(response.data));
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        };
    
    

    fetchTaskTrackers();
    fetchEmployees();
    fetchTasks();
  }, [dispatch]);

  const handleAddTaskTracker = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalTaskTrackerData({
      task_id: "",
      assignedBy: "",
      assignedTo: "",
      assigned_date: "",
      start_date: "",
      end_date: "",
      status:""

    })
  };

  const handleTaskTrackerSubmit = async () => {
    try {
      const newTaskTracker = {
      ...modalTaskTrackerData
      };
      const response = await axios.post('http://localhost:3000/taskTracker', newTaskTracker);
      dispatch(addTaskTracker(newTaskTracker));
      toast.success("Task tracker added successfully!");
      handleModalClose();
    } catch (error) {
      console.error('Error adding task tracker:', error);
      toast.error("Failed to add task tracker.");
    }
  };
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [taskTrackerToDelete, setTaskTrackerToDelete] = useState(null);
  
  const confirmDelete = (id) => {
    setTaskTrackerToDelete(id);
    setShowDeleteModal(true);
  };
  
  const handleCancelDelete = () => {
    setTaskTrackerToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (taskTrackerToDelete !== null) {
      try {
        await axios.delete(`http://localhost:3000/taskTracker/${taskTrackerToDelete}`);
        dispatch(deleteTaskTracker(taskTrackerToDelete));
        toast.success("Task tracker deleted successfully!");
      } catch (error) {
        console.error('Error deleting task tracker:', error);
        toast.error("Failed to delete task tracker.");
      }
      setTaskTrackerToDelete(null);
      setShowDeleteModal(false);
    }
  };



  const handleEdit = (taskTracker) => {
    setEditingTaskTrackerId(taskTracker.id);
  
    setUpdatedTaskTrackerData({
     
  ...updatedTaskTrackerData
    });
  };
  

  const handleUpdate = async (id) => {
    try {
      const updatedTaskTracker = {
       ...updatedTaskTrackerData
      };
      await axios.put(`http://localhost:3000/taskTracker/${id}`, updatedTaskTracker);
      dispatch(updateTaskTracker({ id, updatedTaskTracker }));
      toast.success("Task tracker updated successfully!");
      setEditingTaskTrackerId(null);
    } catch (error) {
      console.error('Error updating task tracker:', error);
      toast.error("Failed to update task tracker.");
    }
  };
  

  const handleInputChange = (e) => {
    setUpdatedTaskTrackerData({
      ...updatedTaskTrackerData,
      [e.target.name]: e.target.value
    });
  };

  return {
    taskTrackers,
    handleAddTaskTracker,
    handleInputChange,
    handleUpdate,
    handleEdit,
    handleDelete,
    editingTaskTrackerId,
    updatedTaskTrackerData,
    isModalOpen,
    handleModalClose,
    handleTaskTrackerSubmit,
    handleCancelDelete,
    confirmDelete,
    showDeleteModal,
    employees,
    tasks,
    setModalTaskTrackerData,
    modalTaskTrackerData,
    setModalTaskTrackerData
  
  };
};
