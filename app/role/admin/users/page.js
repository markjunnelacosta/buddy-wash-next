"use client";
import React, {useState} from 'react'
import Layout from '../components/layout';
import './page.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AdminPage from './add-users/page';

function Users() {

  const [showAdminPage, setShowAdminPage] = useState(false);

  const openAdminPage = () => {
    setShowAdminPage(true);
  };

  const closeAdminPage = () => {
    setShowAdminPage(false);
  };

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
                <th>UserID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th>Position</th>
                <th>UserName</th>
                <th>Password</th>
                <th>Action</th>
              </tr>
            </thead>

          </table>
        </div>
      </div>
      <AdminPage isOpen={showAdminPage} onClose={closeAdminPage} />
    </>
  )
}

export default Users