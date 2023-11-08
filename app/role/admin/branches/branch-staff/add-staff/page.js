"use client";
import React, { useState } from "react";
import './addStaff.css'


const StaffPage = ({ isOpen, onClose, onSaveData, branchId }) => {
  const [staffName, setStaffName] = useState("");
  const [staffAddress, setStaffAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [staffPosition, setStaffPosition] = useState("");


  const onClick = async () => {
    console.log(staffName, staffAddress, phoneNumber, staffPosition, branchId);
    const response = await fetch("/api/branch-staff", {
      method: "POST",
      body: JSON.stringify({
        staffName: staffName,
        staffAddress: staffAddress,
        phoneNumber: phoneNumber,
        staffPosition: staffPosition,
        staffBranchId: branchId
      }),
    });
    console.log(response);
    onSaveData();
    onClose();
  };

  return (
    <>
        {isOpen && (
          <div className="form-container visible">
          <div>
            <p>New Staff</p>
            <hr />
            <div className="form-group">
              <div id="first">
                <p>Name</p>
                <input
                  type="text"
                  value={staffName}
                  onChange={(e) => setStaffName(e.currentTarget.value)}
                ></input>
                <p>Address</p>
                <input
                  type="text"
                  value={staffAddress}
                  onChange={(e) => setStaffAddress(e.currentTarget.value)}
                ></input>
              </div>

              <div id="second">
                <p>Phone Number</p>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                ></input>
                <p>Position</p>
                <input
                  type="text"
                  value={staffPosition}
                  onChange={(e) => setStaffPosition(e.currentTarget.value)}
                ></input>
              </div>

            </div>
            <br />
            <button className="cancel" onClick={onClose}>Cancel</button>
            <button className="save" onClick={onClick}>Save</button>
          </div>
          </div>
        )}

      

    </>
  );
};

export default StaffPage;