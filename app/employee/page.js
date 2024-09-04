"use client";
import { useSelector } from "react-redux";
import Navbar from "@/components/core/navbar";
import { useEmployeeHooks } from "@/hooks/useEmployeeHooks";

const EmployeeList = () => {
const {employees = [], loading, error} = useSelector((state) => state.employee || {});
const {editingEmployee,updatedData,successmsg,errormsg,handleInputChange,handleUpdate,handleDelete,handleEdit} = useEmployeeHooks();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="header flex justify-between items-center mb-3">
          <h1 className="text-2xl font-bold display-6 text-light">
            Employee List
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-hover table-sm mt-3">
            <thead>
              <tr>
                <th scope="col">S No.</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Contact Number</th>
                <th scope="col">Email Id</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {employees.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center">
                    No employees found
                  </td>
                </tr>
              ) : (
                employees.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6">{index + 1}</td>
                    <td className="py-3 px-6">
                      {editingEmployee === employee.id ? (
                        <input
                          type="text"
                          name="employee_name"
                          value={updatedData.employee_name}
                          onChange={handleInputChange}
                          className="border px-2 py-1"
                        />
                      ) : (
                        employee.employee_name
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {editingEmployee === employee.id ? (
                        <input
                          type="text"
                          name="phone"
                          value={updatedData.phone}
                          onChange={handleInputChange}
                          className="border px-2 py-1"
                        />
                      ) : (
                        employee.phone
                      )}
                    </td>
                    <td className="py-3 px-6">
                      {editingEmployee === employee.id ? (
                        <input
                          type="email"
                          name="email"
                          value={updatedData.email}
                          onChange={handleInputChange}
                          className="border px-2 py-1"
                        />
                      ) : (
                        employee.email
                      )}
                    </td>
                    <td className="py-3 px-6 flex space-x-2">
                      {editingEmployee === employee.id ? (
                        <button
                          onClick={() => {
                            handleUpdate(employee.id);
                            successmsg();
                          }}
                          className="btn btn-outline-primary"
                        >
                          Save
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(employee)}
                            className="btn btn-outline-primary"
                          >
                            Update
                          </button>
                        </>
                      )}
                      {/* <button
                        className="btn btn-outline-primary ms-2"
                      >
                        View Details
                      </button> */}
                      <button
                        onClick={() => {
                          handleDelete(employee.id);
                          errormsg();
                        }}
                        className="btn btn-outline-primary ms-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default EmployeeList;
