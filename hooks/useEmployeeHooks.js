import toast from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {fetchEmployees, updateEmployeeAsync, deleteEmployeeAsync} from "@/redux/slice/employee.slice";

export const useEmployeeHooks = () => {
  const [editingEmployee, setEditingEmployee] = useState(null);
  const dispatch = useDispatch();
  const [updatedData, setUpdatedData] = useState({
    employee_name: "",
    phone: "",
    email: "",
  });
  const successmsg = () => {
    toast.success("User Updated!");
  };

  const errormsg = () => {
    toast.success("User Deleted");
  };

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);
  const handleEdit = (employee) => {
    setEditingEmployee(employee.id);
    setUpdatedData({
      employee_name: employee.employee_name,
      phone: employee.phone,
      email: employee.email,
    });
  };

  const handleUpdate = async (id) => {
    try {
      await dispatch(updateEmployeeAsync({ id, updatedData }));
      setEditingEmployee(null);
      dispatch(fetchEmployees());
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteEmployeeAsync(id));
      dispatch(fetchEmployees());
    } catch (error) {
      console.error("Failed to update role:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return{
    editingEmployee,
    setEditingEmployee,
    updatedData,
    setUpdatedData,
    successmsg,
    errormsg,
    handleInputChange,
    handleUpdate,
    handleDelete,
    handleEdit
  }
}
