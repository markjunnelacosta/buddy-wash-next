"use client";

import React from 'react'
import { useState } from 'react';
import './addBranch.css'


const AddBranch = ({ isOpen, closeAddBranch, onSaveData }) => {
  const [branchAddress, setBranchAddress] = useState("");
  const [branchNumber, setBranchNumber] = useState("");

  const onClick = async () => {
    if (
      !branchAddress ||
      !branchNumber
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(branchAddress)) {
      alert("Invalid characters in branch address. Please enter a valid name.");
      return;
    }

    const numberRegex = /^\d+$/;
    if (!numberRegex.test(branchNumber)) {
      alert("Invalid characters in branch number. Please enter a valid number.");
      return;
    }


    console.log(branchAddress, branchNumber);
    const response = await fetch("/api/branch", {
      method: "POST",
      body: JSON.stringify({
        branchAddress: branchAddress,
        branchNumber: branchNumber,
      }),
    });

    console.log(response);

    closeAddBranch();

    onSaveData();
  };
  return (
    <>

      {isOpen && (

        <div className="form-container-add visible">
          <p>Add New Branch</p> <hr />
          <div className='form-group-add'>
            <p></p>
            <p>Branch Number</p>
            <input
            id='add-input'
              type="Number"
              name="branchNumber"
              value={branchNumber}
              onChange={(e) => setBranchNumber(e.currentTarget.value)}
            />
            <p>Branch Address</p>
            <input
            id='add-input'
              type="text"
              name="branchAddress"
              value={branchAddress}
              onChange={(e) => setBranchAddress(e.currentTarget.value)}
            />

          </div>

          <br />
          {/* Cancel button */}
          <button className="cancel" onClick={closeAddBranch}>Cancel</button>
          {/* Save button */}
          <button className="save" onClick={onClick}>Save</button>
        </div>

      )}

    </>
  )
}

export default AddBranch;
