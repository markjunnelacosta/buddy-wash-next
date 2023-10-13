"use client";
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import './page.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AdminPage from './add-users/page';
import Button from "@mui/material/Button";
import RemoveButton from './removeButton';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const getUsers = async () => {
  try {
    const res = await fetch("/api/user", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.userData || [];
  } catch (error) {
    console.log("Error loading users: ", error);
  }
};

const Users = () => {
  const [userData, setUserData] = useState([]);
  const [showAdminPage, setShowAdminPage] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(5); // Default to 10 entries per page
  const [currentPage, setCurrentPage] = useState(1);


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


  const handleEntriesPerPageChange = (event) => {
    setEntriesPerPage(event.target.value);
  };

  const openAdminPage = () => {
    setShowAdminPage(true);
  };

  const closeAdminPage = () => {
    setShowAdminPage(false);
  };

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

  return (
    <>
      <Layout />
      <div className="container-box">

       

        <div className="searchContainer">
       
          <div className="searchContainer-right">
            <p style={{ fontWeight: "bold" }}>Search</p>
            <input type="text" id="searchName" name="customerName" />
          </div>
          <div className="button-container">
          <button className="add-button" onClick={openAdminPage}><AddRoundedIcon />Add User</button>
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
              {userData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage).map((user) => (
                <tr key={user._id}>

                  <td>{user.userName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.userAddress}</td>
                  <td>{user.userRole}</td>
                  <td>{user.userId}</td>
                  <td>{user.password}</td>
                  <td> <Button variant="outlined" id="edit-button">Edit</Button>
                    &nbsp;
                    <RemoveButton id={user._id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <ArrowBackIosRoundedIcon />
          </button>
          <span>{`Showing entries ${startRange}-${endRange} of ${userData.length}`}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ArrowForwardIosRoundedIcon />
          </button>
        </div>
      </div>
      <AdminPage isOpen={showAdminPage} onClose={closeAdminPage} />
    </>
  )
}

export default Users