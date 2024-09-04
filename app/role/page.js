"use client";
import React from "react";
import AddRoleModal from "@/components/model/AddRoleModal";
import Navbar from "@/components/core/navbar";
import { useRoleHooks } from "@/hooks/useRoleHooks";

const Role = () => {
  const {roles, loading, error, editingRoleId, isModalOpen,handleDelete,handleEdit,handleInputChange,handleModalClose,handleUpdate,updatedRoleData,setIsModalOpen}=useRoleHooks()
  
  return (
    <div>
      <Navbar/>
      <div className="container mx-auto p-4">
      <div className="header flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold display-6 text-white">Roles</h1>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
        <div className="container">
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-primary mb-3"
        >
          Add New Role
        </button>
      <table className="table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {roles.map((role) => (
            <tr key={role.id}>
              <td className="">
                {editingRoleId === role.id ? (
                  <input
                    type="text"
                    name="role"
                    value={updatedRoleData.role}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  role.role
                )}
              </td>
              <td className="">
                {new Date(role.created_at).toLocaleDateString()}
              </td>
              <td className="">
                {new Date(role.updated_at).toLocaleDateString()}
              </td>
              <td className="">
                {editingRoleId === role.id ? (
                  <button
                    onClick={() => {handleUpdate(role.id);}}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(role)}
                      className="btn btn-outline-primary"
                    >
                      Update
                    </button>
                  </>
                )}
                <button
                  onClick={() => {handleDelete(role.id)}}
                  className="btn btn-outline-primary ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddRoleModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
    </div>
    </div>
  );
};

export default Role;
