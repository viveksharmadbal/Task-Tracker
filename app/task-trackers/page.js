"use client";

import React, { useState } from "react";
import { useTaskTrackers } from "@/hooks/taskTrackerHook";
import DeleteConfirmationModal from "@/components/model/deleteModel";

const TaskTrackerPage = () => {
  const {
    taskTrackers,
    handleAddTaskTracker,
    handleInputChange,
    handleUpdate,
    handleEdit,
    handleDelete,
    editingTaskTrackerId,
    updatedTaskTrackerData,
    modalTaskTrackerData,
    setModalTaskTrackerData,
    isModalOpen,
    handleModalClose,
    handleTaskTrackerSubmit,
    handleCancelDelete,
    confirmDelete,
    showDeleteModal,
    employees,
    tasks
  } = useTaskTrackers();

  const handleLocalInputChange = (e) => {
    const { name, value } = e.target;
    setModalTaskTrackerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e, fieldName) => {
    setModalTaskTrackerData((prevData) => ({
      ...prevData,
      [fieldName]: e.target.value,
    }));
  };

  const handleLocalDateChange = (name, date) => {
    setModalTaskTrackerData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleLocalSubmit = () => {
    setModalTaskTrackerData(modalTaskTrackerData);
    handleTaskTrackerSubmit();
  };

  return (
    <div className="p-6 bg-light min-vh-100">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 font-weight-bold text-dark">Task Tracker</h1>
        <button
          onClick={handleAddTaskTracker}
          className="btn btn-primary"
        >
          Add New Task
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr className="text-left text-sm font-weight-bold">
              <th>Task Name</th>
              <th>Assigned By</th>
              <th>Assigned To</th>
              <th>Assigned Date</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {taskTrackers.map((task) => (
              <tr key={task.id}>
                <td>
                  {editingTaskTrackerId === task.id ? (
                    <select
                      name="task_id"
                      value={updatedTaskTrackerData.task_id}
                      onChange={(e) => handleSelectChange(e, "task_id")}
                      className="form-control"
                    >
                      {tasks.map((taskItem) => (
                        <option key={taskItem.id} value={taskItem.id}>
                          {taskItem.taskName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{task.task_name}</span>
                  )}
                </td>
                <td>
                  {editingTaskTrackerId === task.id ? (
                    <select
                      name="assignedBy"
                      value={updatedTaskTrackerData.assignedBy}
                      onChange={(e) => handleSelectChange(e, "assignedBy")}
                      className="form-control"
                    >
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.employee_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{task.assigned_by_name}</span>
                  )}
                </td>
                <td>
                  {editingTaskTrackerId === task.id ? (
                    <select
                      name="assignedTo"
                      value={updatedTaskTrackerData.assignedTo}
                      onChange={(e) => handleSelectChange(e, "assignedTo")}
                      className="form-control"
                    >
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.employee_name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span>{task.assigned_to_name}</span>
                  )}
                </td>
                <td>
                  {editingTaskTrackerId === task.id ? (
                    <input
                      type="date"
                      name="assigned_date"
                      value={updatedTaskTrackerData.assigned_date}
                      onChange={(e) =>
                        handleInputChange(e)
                      }
                      className="form-control"
                    />
                  ) : (
                    task.assigned_date
                  )}
                </td>
                <td>
                  {editingTaskTrackerId === task.id ? (
                    <input
                      type="date"
                      name="start_date"
                      value={updatedTaskTrackerData.start_date}
                      onChange={(e) =>
                        handleInputChange(e)
                      }
                      className="form-control"
                    />
                  ) : (
                    task.start_date
                  )}
                </td>
                <td>
                  {editingTaskTrackerId === task.id ? (
                    <input
                      type="date"
                      name="end_date"
                      value={updatedTaskTrackerData.end_date}
                      onChange={(e) =>
                        handleInputChange(e)
                      }
                      className="form-control"
                    />
                  ) : (
                    task.end_date
                  )}
                </td>
                <td>
                  {editingTaskTrackerId === task.id ? (
                    <select
                      name="status"
                      value={updatedTaskTrackerData.status}
                      onChange={(e) => handleInputChange(e)}
                      className="form-control"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  ) : (
                    task.status
                  )}
                </td>
                <td className="d-flex">
                  {editingTaskTrackerId === task.id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(task.id)}
                        className="btn btn-success mr-2"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(task)}
                        className="btn btn-warning mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => confirmDelete(task.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DeleteConfirmationModal
        visible={showDeleteModal}
        onConfirm={handleDelete}
        onCancel={handleCancelDelete}
        item="task tracker"
      />

      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Task Tracker</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleModalClose}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group">
                    <label>Task Name</label>
                    <select
                      className="form-control"
                      value={modalTaskTrackerData.task_name}
                      onChange={(e) => handleSelectChange(e, "task_id")}
                    >
                      {tasks.map((taskItem) => (
                        <option key={taskItem.id} value={taskItem.id}>
                          {taskItem.taskName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Assigned By</label>
                    <select
                      className="form-control"
                      value={modalTaskTrackerData.assignedBy}
                      onChange={(e) => handleSelectChange(e, "assignedBy")}
                    >
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.employee_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Assigned To</label>
                    <select
                      className="form-control"
                      value={modalTaskTrackerData.assignedTo}
                      onChange={(e) => handleSelectChange(e, "assignedTo")}
                    >
                      {employees.map((employee) => (
                        <option key={employee.id} value={employee.id}>
                          {employee.employee_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Assigned Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={modalTaskTrackerData.assigned_date}
                      onChange={(e) =>
                        handleLocalDateChange("assigned_date", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={modalTaskTrackerData.start_date}
                      onChange={(e) =>
                        handleLocalDateChange("start_date", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      value={modalTaskTrackerData.end_date}
                      onChange={(e) =>
                        handleLocalDateChange("end_date", e.target.value)
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      className="form-control"
                      value={modalTaskTrackerData.status}
                      onChange={(e) => handleLocalInputChange(e)}
                      name="status"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLocalSubmit}
                >
                  Save changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleModalClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskTrackerPage;
