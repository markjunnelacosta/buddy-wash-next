"use client";
import { useState, useEffect } from 'react';
import React from 'react'
import Layout from '../components/layout';
import './branches.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddBranch from './add-branch/page';


const Branches = () => {
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [branches, setBranches] = useState([]);

  // Function to open the admin page
  const openAddBranch = () => {
    setShowAddBranch(true);
  };

  // Function to close the admin page
  const closeAddBranch = () => {
    setShowAddBranch(false);
  };

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/branch', {
        cache: 'no-store',
      });

      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await res.json();
      setBranches(data.branch);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);



  const handleSaveData = () => {
    closeAddBranch();
    fetchData();
  };

  return (
    <>
      <Layout />
      <div className="container-box">
        <div className="searchContainer">
          <div className="searchContainer-right">
            <p style={{ fontWeight: "bold" }}>Search</p>
            <input type="text" id="searchName" name="branchName" />
          </div>
          <div className="button-container">
            <button className="add-button" onClick={openAddBranch}>
              <AddRoundedIcon /> Add New Branch
            </button>
          </div>
        </div>
        <div className="branches-list">
        {branches.map((branch) => (
          <div key={branch._id}>
            <p>{branch.branchId}</p>
            <p>{branch.branchAddress}</p>
            <p>{branch.numberOfStaff}</p>
          </div>
        ))}
      </div>
      
      </div>
      <AddBranch isOpen={showAddBranch} onSaveData={handleSaveData} closeAddBranch={closeAddBranch} />
    </>
  )
}

export default Branches;