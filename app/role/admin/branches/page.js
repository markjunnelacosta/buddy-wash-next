"use client";
import { useState, useEffect } from 'react';
import React from 'react'
import Layout from '../components/layout';
import './branches.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';


const Branches = () => {
  const [showAddBranch, setShowAddBranch] = useState(false);

  // Function to open the admin page
  const openAddBranch = () => {
    setShowAddBranch(true);
  };

  // Function to close the admin page
  const closeAddBranch = () => {
    setShowAddBranch(false);
  };

  return (
    <>
      <Layout />
      <div className="form-container">
      <div className="searchContainer">
          <div className="searchContainer-right">
            <p style={{ fontWeight: "bold" }}>Search</p>
            <input type="text" id="searchName" name="branchName" />
          </div>
          <div className="button-container">
            <button className="add-button" onClick={openAddBranch}>
              <AddRoundedIcon /> New Branch
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Branches;