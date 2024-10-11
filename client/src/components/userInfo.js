import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import { NavLink } from "react-router-dom";
import { statusChange, deleteUser } from "../api/api";
import Pagination from "./Pagination";

const UserInfo = ({ userData, setUserData, deleteUser, userGet, handlePrev, handleNext, page, pageCount, setPage }) => {

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await statusChange(id, newStatus);

      if (response.status === 200) {
        const updatedUserData = userData.map(user =>
          user._id === id ? { ...user, status: newStatus } : user
        );
        setUserData(updatedUserData);
        await userGet();
        toast.success("Status updated");
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status", error);
      toast.error("Failed to update status");
    }
  };
  /*const handleDelete=async(id)=>{
    try {
      const res = await deleteUser(id)
      if(res.status===200)
      {
        console.log("deleted")
        toast.success("User Deleted successfully")
      }
      else
      {
        toast.error("error in deleting the user")
      }
    } catch (error) {
      toast.error("error")
    }
  }*/

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm font-light border-collapse border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b font-bold">Index</th>
              <th className="py-3 px-4 border-b font-bold">Name</th>
              <th className="py-3 px-4 border-b font-bold">Email</th>
              <th className="py-3 px-4 border-b font-bold">Gender</th>
              <th className="py-3 px-4 border-b font-bold">Status</th>
              <th className="py-3 px-4 border-b font-bold">Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.length > 0 ? (
              userData.map((element, index) => (
                <tr key={element._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b font-semibold">{index + 1 + (page - 1) * 4}</td>
                  <td className="py-3 px-4 border-b font-semibold">{element.fname + " " + element.lname}</td>
                  <td className="py-3 px-4 border-b font-semibold">{element.email}</td>
                  <td className="py-3 px-4 border-b font-semibold">{element.gender === 'Male' ? 'Male' : 'Female'}</td>
                  <td className="py-3 px-4 border-b">
                    <select
                      className={`px-2 py-1 rounded-md text-white font-semibold ${
                        element.status === "Active" ? "bg-blue-500" : "bg-red-500"
                      }`}
                      value={element.status}
                      onChange={(e) => handleStatusChange(element._id, e.target.value)}
                    >
                      <option value="Active">Active</option>
                      <option value="InActive">InActive</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex space-x-4">
                      <NavLink
                        to={`/profile/${element._id}`}
                        className="text-green-500 hover:underline font-semibold"
                      >
                        View
                      </NavLink>
                      <NavLink
                        to={`/edit/${element._id}`}
                        className="text-yellow-500 hover:underline font-semibold"
                      >
                        Edit
                      </NavLink>
                      <button
                        onClick={() => deleteUser(element._id)}
                        className="text-red-500 hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500 font-semibold">
                  No Data Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Component */}
      <div className="mt-4">
        <Pagination
          handlePrev={handlePrev}
          handleNext={handleNext}
          page={page}
          pageCount={pageCount}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default UserInfo;
