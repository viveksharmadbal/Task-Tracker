import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchProjects,
    deleteProjectAsync,
    updateProjectAsync,
  } from "@/redux/slice/project.slice";
import toast from "react-hot-toast";

export const useProjectHooks = () => {
const dispatch = useDispatch();
const { projects, loading, error } = useSelector((state) => state.project);
const [isModalOpen, setIsModalOpen] = useState(false);
const [openViewDetailsModal, setOpenViewDetailsModal] = useState(false);
const [viewProjectDetailsId, setViewProjectDetailsId] = useState(null);
const [updatedProjectData, setUpdatedProjectData] = useState({project: "",});
const [editingProjectId, setEditingProjectId] = useState(null);

const successmsg = () => {
    toast.success("Project Updated!");
  };

const errormsg = () => {
    toast.success("Project Deleted");
  };

    useEffect(() => {
        dispatch(fetchProjects());
      }, [dispatch]);

      const handleDelete = async (id) => {
        try {
          await dispatch(deleteProjectAsync(id));
          toast.success("Project Deleted Successfully!");
          dispatch(fetchProjects());
        } catch (error) {
          toast.error("Failed to delete project.");
        }
      };
    
      const handleEdit = (project) => {
        setEditingProjectId(project.id);
        setUpdatedProjectData({
          project: project.project,
        });
      };
    
      const handleUpdate = async (id) => {
        try {
          await dispatch(updateProjectAsync({ id, updatedProjectData }));
          successmsg();
          setEditingProjectId(null);
          dispatch(fetchProjects());
        } catch (error) {
          toast.error("Failed to update project.");
        }
      };
    
      const handleInputChange = (e) => {
        setUpdatedProjectData({
          ...updatedProjectData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleViewDetails = (id) => {
        setViewProjectDetailsId(id);
        setOpenViewDetailsModal(true);
      };
  return{projects, loading, error,isModalOpen, setIsModalOpen,openViewDetailsModal, setOpenViewDetailsModal,viewProjectDetailsId, setViewProjectDetailsId,updatedProjectData, setUpdatedProjectData,editingProjectId, setEditingProjectId,handleDelete,handleEdit,
    handleUpdate,handleInputChange,handleViewDetails,successmsg,errormsg
  }
}
