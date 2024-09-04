"use client";
import React from "react";
import { useTasks } from "@/hooks/useTaskHook";
import DeleteConfirmationModal from "@/components/model/deleteModel";
import Navbar from "@/components/core/navbar";

const TaskList = () => {
  const {
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
    showDeleteModal,
  } = useTasks();

  return (
    <div>
    <Navbar/>
    <div className="container py-4 min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 text-light">Task List</h1>
        <button
          onClick={handleAddTask}
          className="btn btn-primary justify-content-end"
        >
          Add New Task
        </button>
      </div>

      <table className="table table-bordered bg-white shadow-sm rounded">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Task Name</th>
            <th scope="col">Description</th>
            <th scope="col" className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {tasks.map((task, index) => (
            <tr key={task.id}>
              <td className="text-center align-middle">{index + 1}</td>
              <td className="align-middle">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    name="taskName"
                    value={updatedTaskData.taskName || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <span>{task.taskName}</span>
                )}
              </td>
              <td className="align-middle">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    name="description"
                    value={updatedTaskData.description || ""}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                ) : (
                  <span>{task.description}</span>
                )}
              </td>
              <td className="text-center align-middle">
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={() => handleUpdate(task.id)}
                      className="btn btn-outline-success ms-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleViewDetails(task.id)}
                      className="btn btn-outline-info ms-2"
                    >
                      View Details
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(task)}
                      className="btn btn-outline-dark ms-2"
                    >
                      Update
                    </button>
                    {/* <button
                      onClick={() => handleViewDetails(task.id)}
                      className="btn btn-outline-dark ms-2"
                    >
                      View Details
                    </button> */}
                  </>
                )}
                <button
                  onClick={() => confirmDelete(task.id)}
                  className="btn btn-outline-danger ms-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <DeleteConfirmationModal
        visible={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
        item="task"
      />
    </div>
    </div>
  );
};

export default TaskList;
