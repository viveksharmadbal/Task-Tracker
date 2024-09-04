import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRoleAsync } from "@/redux/slice/role.slice";
import { InputWithLabel } from "../core/Input";
import toast from "react-hot-toast";

const AddRoleModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [roleName, setRoleName] = useState({ role: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoleName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    try {
      await dispatch(addRoleAsync({ role: roleName.role }));
      setTimeout(() => {
        dispatch(fetchRoles());
      }, 4000);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const successmsg2 = () => {
    toast.success('Role created successfully!');
  };

  if (!isOpen) return null;

  return (
    <div className="container">
     <div
      className="modal-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
      onClick={onClose}
    ></div>
      <div className="card card-body">
        <h2 className="text-2xl font-bold mb-4 card-title">Add New Role</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputWithLabel
              label={"Role"}
              name={"role"}
              isRequired={true}
              state={roleName.role}
              onChangeHandler={handleChange} 
            />
          </div>
          <div className="">
            <button
              type="submit"
              className="btn btn-primary" 
              onClick={()=>successmsg2()}>
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary ms-2">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRoleModal;
