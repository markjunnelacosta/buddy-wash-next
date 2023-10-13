"use client";
import React, { useState, useEffect } from 'react'
import Layout from '../components/layout';
import './page.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AdminPage from './add-users/page';

function Users() {

  const [showAdminPage, setShowAdminPage] = useState(false);
  const [userData, setUserData] = useState([]);

  const openAdminPage = () => {
    setShowAdminPage(true);
  };

  const closeAdminPage = () => {
    setShowAdminPage(false);
  };

  useEffect(() => {
    fetch('/api/users')
      .then((response) => response.json())
      .then((data) => setUserData(data));
  }, [])

  return (
    <>
      <Layout />
      <div className="container-box">
        <div className="button-container">
          <button className="add-button" onClick={openAdminPage}><AddRoundedIcon />Add User</button>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Position</th>
                <th>UserID</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userData.map((user) => (
                <tr key={user.userId}>
                  <td>{user.userName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.userAddress}</td>
                  <td>{user.userRole}</td>
                  <td>{user.userId}</td>
                  <td>{user.password}</td>
                  <td> {/* You can add action buttons here */}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AdminPage isOpen={showAdminPage} onClose={closeAdminPage} />
    </>
  )
}

export default Users