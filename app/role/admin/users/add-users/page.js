"use client";
import React, { useState, useEffect } from "react";
import './addUsers.css'


const AdminPage = ({ isOpen, onClose, onSaveData }) => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [branchesData, setBranchesData] = useState([]);


  const onClick = async () => {
    
    if (
      !userName ||
      !phoneNumber ||
      !userAddress || 
      !userRole ||
      !userId ||
      !password ||
      !selectedBranch
    ) { 
      alert("Please fill in all required fields.");
      return;
    }

    const numberRegex = /^\d+$/;
    if (!numberRegex.test(phoneNumber)) {
      alert("Invalid characters in phone number. Please enter a valid number.");
      return;
    }

    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(userName)) {
      alert("Invalid characters in user name. Please enter a valid name.");
      return;
    }

    console.log(userName, phoneNumber, userAddress, userRole, userId, password);
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        phoneNumber: phoneNumber,
        userAddress: userAddress,
        userRole: userRole,
        userId: userId,
        password: password,
        selectedBranch: selectedBranch,
      }),
    });

    console.log(response);

    onSaveData();
    onClose();
  };

  const handlePhoneNumberChange = (e) => {
    const input = e.currentTarget.value;
    // Limit the input to a maximum of 11 characters
    const limitedInput = input.slice(0, 11);
    setPhoneNumber(limitedInput);
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

  return (
    <>
      {isOpen && (
        <div className="form-container visible">
          <div>
            <p>Add User</p>
            <hr />
            <div className="form-group">
              <div id="first">
                <p>User Name</p>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.currentTarget.value)}
                ></input>
                <p>Address</p>
                <input
                  type="text"
                  value={userAddress}
                  onChange={(e) => setUserAddress(e.currentTarget.value)}
                ></input>
                <p>UserID</p>
                <input
                  type="text"
                  value={userId}
                  onChange={(e) => setUserId(e.currentTarget.value)}
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
                  onChange={handlePhoneNumberChange}
                ></input>
                <p>Position</p>
                 <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.currentTarget.value)}
                >
                  <option value=""></option>
                  <option value="admin">Manager</option>
                  <option value="staff">Staff</option>
                  <option value="owner">Owner</option>
                </select>
                <p>Password</p>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
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

export default AdminPage;