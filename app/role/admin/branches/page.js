"use client"
import React from 'react';
import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import './branches.css';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import AddBranch from './add-branch/page';
import Button from "@mui/material/Button";
import RemoveButton from './removeButton';
import EditBranchPopup from './eButton';
import { useRouter } from 'next/navigation';
import BranchStaff from './branch-staff/page';
import StaffPage from './branch-staff/add-staff/page';

const getBranch = async () => {
  try {
    const res = await fetch("/api/branch", {
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
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isUpdateBranchPopupVisible, setUpdateBranchPopupVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showBranchStaffPopup, setShowBranchStaffPopup] = useState(false);
  const [selectedBranchAddress, setSelectedBranchAddress] = useState('');
  const [branchStaffData, setBranchStaffData] = useState({});
  const [showAddStaff, setShowAddStaff] = useState(false);

  const router = useRouter();

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

  const fetchData = async () => {
    try {
      const res = await fetch("/api/branch", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch branch");
      }

      const response = await res.json();
      setBranchesData(response.branchesData);
    } catch (error) {
      console.log("Error loading branches: ", error);
    }
  };

  useEffect(() => {
    console.log(branchesData);
  }, [branchesData]);

  const handleSeeInfo = (branchId, branchAddress) => {
    setSelectedBranch(branchId);
    setSelectedBranchAddress(branchAddress);
    console.log("Selected Branch ID:", branchId);
    setShowBranchStaffPopup(true);
  };

  const openAddBranch = () => {
    setShowAddBranch(true);
  };

  const closeAddBranch = () => {
    setShowAddBranch(false);
  };

  const handleEditBranch = (branch) => {
    setSelectedBranch(branch);
    setUpdateBranchPopupVisible(true);
  };

  const handleClose = () => {
    setUpdateBranchPopupVisible(false);
  };

  const filteredBranches = branchesData.filter((branch) =>
    branch.branchAddress.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveData = () => {
    closeAddBranch();
    fetchData();
  };

  // Inside your Branches component
  const openAddStaff = () => {
    setShowAddStaff(true);
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
              name="branchAddress"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="button-container">
            <button className="add-button-branch" onClick={openAddBranch}>
              <AddRoundedIcon /> Add New Branch
            </button>
          </div>
        </div>
        <div className="branches-list">
          {filteredBranches.map((branch) => (
            <div key={branch._id} className="branch-container">
              <p id="branch-num">Branch {branch.branchNumber}</p>
              <p>Location: {branch.branchAddress}</p>
              <div className="b-container">
                <Button
                  variant="outlined"
                  id="edit-button"
                  style={{ borderColor: '#b57b24', color: '#b57b24' }}
                  onClick={() => handleSeeInfo(branch._id, branch.branchAddress)}
                >
                  See Info
                </Button>
                &nbsp;
                <Button
                  variant="outlined"
                  style={{ borderColor: 'blue' }}
                  id="edit-button"
                  onClick={() => handleEditBranch(branch)}
                >
                  Edit
                </Button>
                &nbsp;
                <RemoveButton id={branch._id} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddBranch isOpen={showAddBranch} onSaveData={handleSaveData} closeAddBranch={closeAddBranch} />
      <EditBranchPopup
        isOpen={isUpdateBranchPopupVisible}
        branch={selectedBranch}
        onClose={handleClose}
        onSave={handleSaveData}
      />
      {showBranchStaffPopup && (
        <BranchStaff onClose={() => setShowBranchStaffPopup(false)}
          branchId={selectedBranch}
          selectedBranchAddress={selectedBranchAddress}
        />
      )}
      {showAddStaff && (
        <StaffPage
          isOpen={showAddStaff}
          onClose={() => setShowAddStaff(false)}
          onSaveData={handleSaveData}
          branchId={selectedBranch} // Pass the selected branchId
        />
      )}
    </>
  );
}

export default Branches;
