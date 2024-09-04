"use client";
import React from "react";
import AddProjectModal from "@/components/model/AddProjectModal";
import Navbar from "@/components/core/navbar";
import ViewProjectDetails from "@/components/model/viewProjectDetails";
import { useProjectHooks } from "@/hooks/useProjectHooks";

const Project = () => {
  const {
    projects,
    loading,
    error,
    isModalOpen,
    setIsModalOpen,
    openViewDetailsModal,
    setOpenViewDetailsModal,
    viewProjectDetailsId,
    updatedProjectData,
    editingProjectId,
    handleDelete,
    handleEdit,
    handleUpdate,
    handleInputChange,
    handleViewDetails,
  } = useProjectHooks();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="header flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold display-6 text-light">Projects</h1>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div className="container">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary justify-content-end"
          >
            Add New Project
          </button>
          <table className="table table-hover table-sm mt-3">
            <thead>
              <tr>
                <th className="">Project Name</th>
                <th className="">Created At</th>
                <th className="">Updated At</th>
                <th className="">Actions</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className="">
                    {editingProjectId === project.id ? (
                      <input
                        type="text"
                        name={"project"}
                        value={updatedProjectData.project}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    ) : (
                      project.project
                    )}
                  </td>
                  <td className="">
                    {new Date(project.created_at).toLocaleDateString()}{" "}
                  </td>
                  <td className="">
                    {new Date(project.updated_at).toLocaleDateString()}{" "}
                  </td>
                  <td className="flex space-x-2">
                    {editingProjectId === project.id ? (
                      <button
                        onClick={() => {handleUpdate(project.id)}}
                        className="btn btn-outline-primary"
                      >
                        Save
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(project)}
                          className="btn btn-outline-primary"
                        >
                          Update
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => {handleDelete(project.id)}}
                      className="btn btn-outline-primary ms-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewDetails(project.id)}
                      className="btn btn-primary ms-2"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <AddProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
          {openViewDetailsModal && (
            <ViewProjectDetails
              viewProjectDetailsId={viewProjectDetailsId}
              openViewDetailsModal={openViewDetailsModal}
              setOpenViewDetailsModal={setOpenViewDetailsModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Project;
