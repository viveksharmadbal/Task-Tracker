import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRoles,
  deleteRoleAsync,
  updateRoleAsync,
} from "@/redux/slice/role.slice";
import toast from 'react-hot-toast';

export const useRoleHooks = () => {
    const dispatch = useDispatch();
  const { roles, loading, error } = useSelector((state) => state.role);
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [updatedRoleData, setUpdatedRoleData] = useState({
    role: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteRoleAsync(id));
    errormsg();
  };

  const handleEdit = (role) => {
    setEditingRoleId(role.id);
    setUpdatedRoleData({
      role: role.role,
    });
  };

  const handleUpdate = async(id) => {
    try {
      await dispatch(updateRoleAsync({ id, updatedRoleData }));
      setEditingRoleId(null);
      successmsg();
      dispatch(fetchRoles());
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };
  
  const handleInputChange = (e) => {
    setUpdatedRoleData({
      ...updatedRoleData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const successmsg = () => {
    toast.success('Role Updated!');
  };
  
  const errormsg=()=>{
    toast.success("Role Deleted")
  }

  return{
    roles, loading, error, editingRoleId, isModalOpen,handleDelete,handleEdit,handleInputChange,handleModalClose,handleUpdate,successmsg,errormsg, updatedRoleData, isModalOpen, setIsModalOpen
  }
}
