"use client";
import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DeleteConfirmationModal from "@/components/model/deleteModel";
import { useDispatch } from "react-redux";
import { useAssignProjects } from "@/hooks/useAssignProjects";
import { fetchEmployees } from "@/redux/slice/employee.slice";
import { fetchProjects } from "@/redux/slice/project.slice";
import { fetchRoles } from "@/redux/slice/role.slice";
import Navbar from "@/components/core/navbar";

const AssignProjectPage = () => {
  const dispatch = useDispatch();
  const {
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
  } = useAssignProjects();

  useEffect(() => {
    fetchAssignProjects();
    dispatch(fetchProjects());
    dispatch(fetchEmployees());
    dispatch(fetchRoles());
  }, [dispatch]);

  const handleSelectChange = (e) => {
    const { name, value, selectedOptions } = e.target;
    const selectedOptionText = selectedOptions[0]?.text || "";

    setModalAssignProjectData((prevData) => ({
      ...prevData,
      [name]: value,
      [`${name}_name`]: selectedOptionText,
    }));
  };

  return (
    <>
      <Navbar />
      <div className="p-4 min-vh-100">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="h3 text-light">Assign Project List</h1>
          <Button onClick={handleAddAssignProject} variant="primary">
            Assign New Project
          </Button>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>S.No</th>
                <th>Employee Name</th>
                <th>Project</th>
                <th>Role</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignProjects.map((assignProject, index) => (
                <tr key={assignProject.id}>
                  <td>{index + 1}</td>
                  <td>
                    {editingAssignProjectId === assignProject.id ? (
                      <Form.Select
                        name="employee_id"
                        value={modalAssignProjectData.employee_id || ""}
                        onChange={handleSelectChange}
                      >
                        <option value="">Select Employee</option>
                        {employees.map((employee) => (
                          <option key={employee.id} value={employee.id}>
                            {employee.employee_name}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      assignProject.employee_name
                    )}
                  </td>
                  <td>
                    {editingAssignProjectId === assignProject.id ? (
                      <Form.Select
                        name="project_id"
                        value={modalAssignProjectData.project_id || ""}
                        onChange={handleSelectChange}
                      >
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                          <option key={project.id} value={project.id}>
                            {project.project}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      assignProject.project
                    )}
                  </td>
                  <td>
                    {editingAssignProjectId === assignProject.id ? (
                      <Form.Select
                        name="role_id"
                        value={modalAssignProjectData.role_id || ""}
                        onChange={handleSelectChange}
                      >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.role}
                          </option>
                        ))}
                      </Form.Select>
                    ) : (
                      assignProject.role
                    )}
                  </td>
                  <td className="text-center">
                    {editingAssignProjectId === assignProject.id ? (
                      <Button
                        variant="primary"
                        onClick={() => handleUpdate(assignProject.id)}
                        className="me-2"
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(assignProject)}
                        className="me-2"
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => confirmDelete(assignProject.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={isModalOpen} onHide={handleModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Assign Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEmployee">
                <Form.Label>Select Employee</Form.Label>
                <Form.Select
                  name="employee_id"
                  value={modalAssignProjectData.employee_id || ""}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {employee.employee_name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formProject" className="mt-3">
                <Form.Label>Select Project</Form.Label>
                <Form.Select
                  name="project_id"
                  value={modalAssignProjectData.project_id || ""}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Project</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.project}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formRole" className="mt-3">
                <Form.Label>Select Role</Form.Label>
                <Form.Select
                  name="role_id"
                  value={modalAssignProjectData.role_id || ""}
                  onChange={handleSelectChange}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAssignProjectSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <DeleteConfirmationModal
          isOpen={showDeleteModal}
          onCancel={handleCancelDelete}
          onConfirm={handleDelete}
        />
      </div>
    </>
  );
};

export default AssignProjectPage;
