import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProjectAsync } from "@/redux/slice/project.slice";
import { InputWithLabel } from "../core/Input";
import { fetchProjects } from "@/redux/slice/project.slice";
import { useEffect } from "react";

const AddProjectModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [projectName, setProjectName] = useState({ project: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectName((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProjectAsync({ project: projectName.project }));
    dispatch(fetchProjects());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="container">
        <div
      className="modal-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
      onClick={onClose}
    ></div>
      <div className="card card-body">
        <h2 className="text-2xl font-bold mb-4 card-title">Add New Project</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <InputWithLabel
              label={"Project Name"}
              name={"project"}
              isRequired={true}
              state={projectName.project}
              onChangeHandler={handleChange}
            />
          </div>
          <div className="">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary ms-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProjectModal;