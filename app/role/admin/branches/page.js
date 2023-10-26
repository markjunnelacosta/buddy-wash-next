"use client";
import { useState, useEffect } from 'react';
import React from 'react'
import Layout from '../components/layout';
import './branches.css'
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddBranch from './add-branch/page';


// Function to fetch user data from the server
const getBranch = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/branch", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch branches");
    }

    const response = await res.json();
    return response.branchesData;
  } catch (error) {
    console.log("Error loading users: ", error);
  }
};

const Branches = () => {
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [branchesData, setBranchesData] = useState([]);

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const branches = await getBranch();
        setBranchesData(branches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranch();
  }, []);

  // Log the user data for debugging
  useEffect(() => {
    console.log(branchesData);
  }, [branchesData]);

  // Function to open the admin page
  const openAddBranch = () => {
    setShowAddBranch(true);
  };

  // Function to close the admin page
  const closeAddBranch = () => {
    setShowAddBranch(false);
  };

  const handleSaveData = () => {
    closeAddBranch();
    fetchBranch();
  };

  return (
    <>
      <Layout />
      <div className="container-box">
        <div className="searchContainer">
          <div className="searchContainer-right">
            <p style={{ fontWeight: "bold" }}>Search</p>
            <input type="text" id="searchName" name="branchAddress" />
          </div>
          <div className="button-container">
            <button className="add-button" onClick={openAddBranch}>
              <AddRoundedIcon /> Add New Branch
            </button>
          </div>
        </div>
        {/* <div className="branches-list">
          {branchesData.map((branch) => (
            <div key={branch._id}>
              <p>{branch.branchNumber}</p>
              <p>{branch.branchAddress}</p>
              <p>{branch.numberOfStaff}</p>
            </div>
          ))}
        </div> */}
        <div className="branches-list">
          {branchesData && branchesData.map((branch) => (
            <div key={branch._id}>
              <p>{branch.branchNumber}</p>
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