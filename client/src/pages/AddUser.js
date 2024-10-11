import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from "../api/api";

const AddUser = () => {
  const [addUser, setAddUser] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: "",
    status: ""
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddUser({ ...addUser, [name]: value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location, status } = addUser;

    
    if (!fname|| !lname|| !email|| !mobile|| !gender|| !location|| !status) {
      toast.error("All fields are required");
      return;
    }

    try {
      const response = await registerUser(addUser);
      if(response)
      {
        toast.success("User added successfully")
      }
      else
      {
        toast.error("Failed to register")
      }
    } catch (error) {
      console.log(error)
    }
  };


  return (
    <div className="container mx-auto p-6 max-w-md">
      <div className="text-2xl font-bold text-center mb-6">Register</div>
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-8 space-y-4">
        <label className="block">
          <span className="text-gray-700">First Name:</span>
          <input
            type="text"
            placeholder="First name"
            name="fname"
            value={addUser.fname}
            onChange={handleInput}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Last Name:</span>
          <input
            type="text"
            placeholder="Last name"
            name="lname"
            value={addUser.lname}
            onChange={handleInput}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Mobile no.:</span>
          <input
            type="text"
            placeholder="Mobile no."
            name="mobile"
            value={addUser.mobile}
            onChange={handleInput}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={addUser.email}
            onChange={handleInput}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Status:</span>
          <select
            name="status"
            value={addUser.status}
            onChange={handleInput}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select an option</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Gender:</span>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleInput}
                checked={addUser.gender === "Male"}
                className="mr-2"
              />
              Male
            </label>
            <label className="ml-4">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleInput}
                checked={addUser.gender === "Female"}
                className="mr-2"
              />
              Female
            </label>
          </div>
        </label>
        <label className="block">
          <span className="text-gray-700">Location:</span>
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={addUser.location}
            onChange={handleInput}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddUser;
