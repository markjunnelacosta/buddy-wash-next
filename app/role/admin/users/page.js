"use client";
import React, { useState, useEffect } from "react";
import Layout from "../components/layout";
import "./page.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AdminPage from "./add-users/page";
import Button from "@mui/material/Button";
import RemoveButton from "./removeButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import UpdateUser from "./edit-users/page";
import EditUserPopup from "./eButton";

// Function to fetch user data from the server
const getUsers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/user", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const response = await res.json();
    return response.userData || [];
  } catch (error) {
    console.log("Error loading users: ", error);
  }
};

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [isUpdateUserPopupVisible, setUpdateUserPopupVisible] = useState(false);

  // Calculate total number of pages based on the data and entries per page
  const totalPages = Math.ceil(userData.length / entriesPerPage);

  // Calculate the start and end range for displayed entries
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, userData.length);

  // Function to handle going to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Function to handle going to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle changing the number of entries per page
  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(event.target.value);
  };

  // Function to open the admin page
  const openAdminPage = () => {
    setShowAdminPage(true);
  };

  // Function to close the admin page
  const closeAdminPage = () => {
    setShowAdminPage(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUpdateUserPopupVisible(true); // Show the popup
  };

  const handleClose = () => {
    setUpdateUserPopupVisible(false); // Hide the popup
  };

  // Filter users based on search query
  const filteredUsers = userData.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );



  // Use an effect to fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const users = await getUsers();
        setUserData(users);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);

  // Log the user data for debugging
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/user", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const response = await res.json();
      const users = response.userData || [];
      setUserData(users); // Assuming you want to update the user data in your component state
    } catch (error) {
      console.log("Error loading users: ", error);
    }
  };

  const handleSaveData = () => {
    closeAdminPage(); // Close the AdminPage
    fetchData();
  };

  return (
    <>
      <Layout />
      <div className="container-box">
        <div className="searchContainer">
          <div className="searchContainer-right">
            <p style={{ fontWeight: "bold" }}>Search</p>
            <input
              type="text"
              id="searchName"
              name="userName"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button className="add-button" onClick={openAdminPage}>
              <AddRoundedIcon /> Add User
            </button>
          </div>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User Name</th>
                <th>Phone Number</th>
                <th>User Address</th>
                <th>User Role</th>
                <th>User ID</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .map((user) => (
                  <tr key={user._id}>
                    <td>{user.userName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.userAddress}</td>
                    <td>{user.userRole}</td>
                    <td>{user.userId}</td>
                    <td>{user.password}</td>
                    <td>
                      <div className="b-container">
                        <Button
                          variant="outlined"
                          id="edit-button"
                          // href={`/role/admin/users/edit-users/${user._id}`}
                          onClick={() => handleEditUser(user)}
                        >
                          Edit
                        </Button>
                        &nbsp;
                        <RemoveButton id={user._id} />
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ArrowBackIosRoundedIcon />
          </button>
          <span>{`Showing entries ${startRange}-${endRange} of ${filteredUsers.length}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosRoundedIcon />
          </button>
        </div>
      </div>
      <AdminPage
        isOpen={showAdminPage}
        onClose={handleSaveData}
        onSaveData={handleSaveData}
      />
      {/* Render the EditUserPopup with the selected user */}
      <EditUserPopup
        isOpen={isUpdateUserPopupVisible}
        user={selectedUser}
        onClose={handleClose}
        onSave={handleSaveData} // Implement the save function
      />
    </>
  );
};

export default Users;
