"use client";
import React, { useState, useEffect } from "react";
import './addStaff.css'

const StaffPage = ({ isOpen, onClose, onSaveData, branchId }) => {
  const [staffName, setStaffName] = useState("");
  const [staffAddress, setStaffAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [staffPosition, setStaffPosition] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchesData, setBranchesData] = useState([]);


  const onClick = async () => {
    if (
      !staffName ||
      !staffAddress ||
      !phoneNumber ||
      !staffPosition
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(staffName)) {
      alert("Invalid characters in staff name. Please enter a valid name.");
      return;
    }

    const numberRegex = /^\d+$/;
    if (!numberRegex.test(phoneNumber)) {
      alert("Invalid characters in phone number. Please enter a valid number.");
      return;
    }

    console.log(staffName, staffAddress, phoneNumber, staffPosition, selectedBranch, branchId);

    const response = await fetch("/api/branch-staff", {
      method: "POST",
      body: JSON.stringify({
        staffName: staffName,
        staffAddress: staffAddress,
        phoneNumber: phoneNumber,
        staffPosition: staffPosition,
        selectedBranch: selectedBranch,
        staffBranchId: branchId
      }),
    });
    console.log(response);
    onSaveData();
    onClose();
    window.location.reload();
  };

  useEffect(() => {
    const fetchBranch = async () => {
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
        console.error("Error fetching customer:", error);
      }
    };

    fetchBranch();
  }, []);

  console.log('branchId in StaffPage:', branchId);
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
                <p>Branch</p>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.currentTarget.value)}
                >
                  <option value=""></option>
                  {branchesData && branchesData.map((branchOption) => (
                  <option key={branchOption.id} value={branchOption.id}>
                    Branch {branchOption.branchNumber}
                  </option>
                ))}
                </select>
              </div>

              <div id="second">
                <p>Phone Number</p>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                ></input>
                <p>Position</p>
                <select
                  value={staffPosition}
                  onChange={(e) => setStaffPosition(e.currentTarget.value)}
                >
                  <option value=""></option>
                  <option value="Owner">Owner</option>
                  <option value="Staff">Staff</option>
                  <option value="Guard">Guard</option>
                  <option value="Technician">Technician</option>
                  <option value="Other">Other</option>
                </select>
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