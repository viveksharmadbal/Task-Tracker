import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setAssignProjects,
  deleteAssignProject,
  updateAssignProject,
  addAssignProject,
} from "@/redux/slice/assignproject.slice";
import { setProjects } from "@/redux/slice/project.slice";
import { setRoles } from "@/redux/slice/role.slice";
import { setEmployees } from "@/redux/slice/employee.slice";
import toast from "react-hot-toast";

export const useAssignProjects = () => {
  const dispatch = useDispatch();
  const assignProjects = useSelector(
    (state) => state.assignproject.assignProjects
  );

  const employees = useSelector((state) => state.employee.employees);
  const projects = useSelector((state) => state.project.projects);
  const roles = useSelector((state) => state.role.roles);
  const [editingAssignProjectId, setEditingAssignProjectId] = useState(null);
  const [updatedAssignProjectData, setUpdatedAssignProjectData] = useState({
    employee_id: "",
    project_id: "",
    role_id: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAssignProjectData, setModalAssignProjectData] = useState({
    employee_id: "",
    project_id: "",
    role_id: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [assignProjectToDelete, setAssignProjectToDelete] = useState(null);

  const fetchAssignProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/assignProject");
      dispatch(setAssignProjects(response.data));
    } catch (error) {
      console.error("Error fetching assign projects:", error);
      toast.error("Failed to fetch assign projects.");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:3000/project");
      dispatch(setProjects(response.data));
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects.");
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/role");
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error("Error fetching roles:", error);
      toast.error("Failed to fetch roles.");
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:3000/employee");
      dispatch(setEmployees(response.data));
    } catch (error) {
      console.error("Error fetching employees:", error);
      toast.error("Failed to fetch employees.");
    }
  };

  //   useEffect(() => {
  //     fetchAssignProjects();
  //     fetchProjects();
  //     fetchRoles();
  //     fetchEmployees();
  //   }, [dispatch]);

  const handleAddAssignProject = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalAssignProjectData({
      employee_id: "",
      project_id: "",
      role_id: "",
    });
  };

  const handleAssignProjectSubmit = async () => {
    try {
      const newAssignProject = { ...modalAssignProjectData };
      const response = await axios.post(
        "http://localhost:3000/assignProject",
        newAssignProject
      );
      dispatch(addAssignProject(newAssignProject));
      toast.success("Assign Project added successfully!", {
        autoClose: 3000,
        style: {
          backgroundColor: "green",
          color: "#FFF",
          borderRadius: "4px",
          padding: "10px",
          fontSize: "14px",
          fontWeight: "bold",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        },
      });
      handleModalClose();
      await fetchAssignProjects();
    } catch (error) {
      console.error("Error adding assign project:", error);
      toast.error("Failed to add assign project.");
    }
  };
  const confirmDelete = (id) => {
    setAssignProjectToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setAssignProjectToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (assignProjectToDelete !== null) {
      try {
        await axios.delete(
          `http://localhost:3000/assignProject/${assignProjectToDelete}`
        );
        dispatch(deleteAssignProject(assignProjectToDelete));
        toast.success("assign project deleted successfully!");
      } catch (error) {
        console.error("Error deleting assign project:", error);
        toast.error("Failed to delete assign project.");
      }
      setAssignProjectToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const handleEdit = (assignProject) => {
    setEditingAssignProjectId(assignProject.id);
    setUpdatedAssignProjectData({
      employee_id: assignProject.employee_id,
      project_id: assignProject.project_id,
      role_id: assignProject.role_id,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedAssignProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async (id) => {
    try {
      console.log("Updating with data:", updatedAssignProjectData);
      const response = await axios.put(
        `http://localhost:3000/assignProject/${id}`,
        updatedAssignProjectData
      );
      console.log("API response:", response.data);
      dispatch(
        updateAssignProject({ id, updatedAssignProjectData: response.data })
      );
      toast.success("Assign Project updated successfully!");
      setEditingAssignProjectId(null);
    } catch (error) {
      console.error("Error updating assign project:", error);
      toast.error("Failed to update assign project.");
    }
  };

  return {
    assignProjects,
    employees,
    projects,
    roles,
    handleAddAssignProject,
    handleInputChange,
    handleUpdate,
    handleEdit,
    handleDelete,
    editingAssignProjectId,
    updatedAssignProjectData,
    isModalOpen,
    handleModalClose,
    modalAssignProjectData,
    setModalAssignProjectData,
    handleAssignProjectSubmit,
    handleCancelDelete,
    confirmDelete,
    showDeleteModal,
    fetchAssignProjects,
    fetchProjects,
    fetchRoles,
    fetchEmployees,
  };
};
