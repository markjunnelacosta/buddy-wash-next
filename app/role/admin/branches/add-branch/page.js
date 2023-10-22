import React from 'react'
import { useState, useEffect } from 'react';
import './addBranch.css'


const AddBranch = ({ isOpen, closeAddBranch }) => {
  const [branchName, setBranchName] = useState("");

  const onClick = async () => {
    console.log(branchName);
    const response = await fetch("/api/branch", {
      method: "POST",
      body: JSON.stringify({
        branchName: branchName,
      }),
    });

    console.log(response);

    closeAddBranch();
  };
  return (
    <>

      {isOpen && (

        <div className="form-container visible">
          <p>Add New Branch</p> <hr />
          <div className='form-group'>
            <p></p>
            <input
              type="text"
              name="userName"
              placeholder="Branch Name"
              value={branchName}
              onChange={(e) => setBranchName(e.currentTarget.value)}
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
