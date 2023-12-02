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
import EditUserPopup from "./eButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Function to fetch user data from the server
const getUsers = async () => {
  try {
    const res = await fetch("/api/user", {
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
  // State variables
  const [userData, setUserData] = useState([]);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query
  const [isUpdateUserPopupVisible, setUpdateUserPopupVisible] = useState(false);

  const totalPages = Math.ceil(userData.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, userData.length);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const openAdminPage = () => {
    setShowAdminPage(true);
  };

  const closeAdminPage = () => {
    setShowAdminPage(false);
  };


  const handleEditUser = (user) => {
    setSelectedUser(user);
    setUpdateUserPopupVisible(true);
  };


  const handleClose = () => {
    setUpdateUserPopupVisible(false); 
  };

  const filteredUsers = userData.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

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


  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/user", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const response = await res.json();
      const users = response.userData || [];
      setUserData(users);
    } catch (error) {
      console.log("Error loading users: ", error);
    }
  };

  const handleSaveData = () => {
    closeAdminPage();
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
          <TableContainer component={Paper}>
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 600 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">User Name</TableCell>
                  <TableCell className="table-header">Phone Number</TableCell>
                  <TableCell className="table-header">User Address</TableCell>
                  <TableCell className="table-header">User Role</TableCell>
                  <TableCell className="table-header">User ID</TableCell>
                  <TableCell className="table-header">Password</TableCell>
                  <TableCell className="table-header">Branch</TableCell>
                  <TableCell className="table-header">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers
                  .slice(
                    (currentPage - 1) * entriesPerPage,
                    currentPage * entriesPerPage
                  )
                  .map((user) => (
                    <TableRow
                      key={user._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{user.userName}</TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>{user.userAddress}</TableCell>
                      <TableCell>{user.userRole}</TableCell>
                      <TableCell>{user.userId}</TableCell>
                      <TableCell>{user.password}</TableCell>
                      <TableCell>{user.selectedBranch}</TableCell>
                      <TableCell>
                        <div className="b-container">
                          <Button
                            variant="outlined"
                            id="edit-button"
                            onClick={() => handleEditUser(user)}
                          >
                            Edit
                          </Button>
                          &nbsp;
                          <RemoveButton id={user._id} />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                  }
              </TableBody>
            </Table>
          </TableContainer>
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
