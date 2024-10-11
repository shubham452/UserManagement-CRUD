import React, { useState, useEffect } from "react";
import UserInfo from "../components/userInfo";
import { getUsers, deleteUser,exporttocsvfunc } from "../api/api";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [userData, setUserData] = useState([]);
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [sort, setSort] = useState("new");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [status, setStatus] = useState("");

  const navigate = useNavigate();

  const userGet = async () => {
    console.log("Current Status:", status);
    const res = await getUsers(search, gender, sort, status, page);
    if (res.status === 200) {
      setUserData(res.data.userData);
      setPageCount(res.data.Pagination.pageCount);
    } else {
      console.log("Error fetching user data");
    }
  };

  useEffect(() => {
    userGet(); // Fetch users on initial render
  }, [page, gender, sort, status,search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchClick = () => {
    userGet(); // Trigger search when clicking the Search button
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleTime = (e) => {
    setSort(e.target.value);
  };

  const handleStatus = (e) => {
    setStatus(e.target.value);
  };

  const handlePrev = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handleNext = () => {
    setPage((prevPage) => (prevPage < pageCount ? prevPage + 1 : prevPage));
  };

  const handleDeleteUser = async (id) => {
    const res = await deleteUser(id);
    if (res.status === 200) {
      userGet();
      toast.success("User deleted successfully");
    } else {
      toast.error("Error deleting user");
    }
  };

  const handleAddUser = () => {
    navigate("/addUser");
  };

  const handleExport = async () => {
    console.log("Export to CSV clicked");
    try {
        const response = await exporttocsvfunc();
        if (response.status === 200) {
            // Create a URL for the blob data
            const blob = new Blob([response.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'user_data.csv'; // Name of the downloaded file
            document.body.appendChild(a);
            a.click(); // Simulate a click to trigger download
            document.body.removeChild(a); // Clean up
            toast.success("CSV exported successfully!"); // Notify user of success
        } else {
            toast.error("Error in export process!");
        }
    } catch (error) {
        console.error("Export error:", error);
        toast.error("Export failed. Please try again!");
    }
};

  


  return (
    <div className="container mx-auto p-4 space-y-6 bg-gray-100">
      {/* Search and Add User Section */}
      <div className="flex justify-between items-center space-x-4 bg-white p-4 rounded-md shadow-md">
        <div className="search flex space-x-2">
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={handleSearch}
            className="border p-2 rounded-md w-full focus:ring focus:ring-blue-300"
          />
          <button
            onClick={handleSearchClick}
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Add User Button */}
        <div className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600">
          <button onClick={handleAddUser}>+ Add User</button>
        </div>
      </div>

      {/* Filters Section */}
      <div className="filter bg-white p-4 rounded-md shadow-md">
        <div className="flex justify-evenly items-start space-x-4">
          {/* Export to CSV Button */}
          <div className="border p-2 rounded-md hover:bg-orange-300">
            <button onClick={handleExport}>Export to CSV</button>
          </div>

          {/* Gender Filter */}
          <div className="flex flex-col items-start space-y-2">
            <h3 className="font-semibold">Filter by gender</h3>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="gender"
                value="All"
                onChange={handleGenderChange}
                checked={gender === "All"}
              />
              <span>All</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleGenderChange}
                checked={gender === "Male"}
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-1">
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleGenderChange}
                checked={gender === "Female"}
              />
              <span>Female</span>
            </label>
          </div>

          {/* Time Filter */}
          <div className="flex flex-col items-start space-y-2">
            <h3 className="font-semibold">Sort</h3>
            <select
              name="sort"
              value={sort}
              onChange={handleTime}
              className="border p-2 rounded-md w-full focus:ring-blue-300"
            >
              <option value="Default">Default</option>
              <option value="old">Old</option>
              <option value="new">New</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex flex-col items-start space-y-2">
            <h3 className="font-semibold">Filter By Status</h3>
            <select
              name="status"
              value={status}
              onChange={handleStatus}
              className="border p-2 rounded-md w-full focus:ring-blue-300"
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="InActive">InActive</option>
            </select>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div>
        <UserInfo
          userData={userData}
          setUserData={setUserData}
          deleteUser={handleDeleteUser}
          userGet={userGet}
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

export default Home;
