"use client";
import React, { useState } from "react";
import './addUsers.css';

// AdminPage component that allows adding a new user
const AdminPage = ({ isOpen, onClose, selectedUser }) => {
  // Define state variables for form inputs
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // Handle the onClick event when the "Save" button is clicked
  const onClick = async () => {
    if (selectedUser) {
      // Update an existing user
      const response = await fetch(`/api/user/${selectedUser._id}`, {
        method: "PUT", // Use PUT or PATCH as per your backend API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          phoneNumber: phoneNumber,
          userAddress: userAddress,
          userRole: userRole,
          userId: userId,
          password: password,
        }),
      });
      // Handle response and update the user data in the frontend as needed
    }
    
    else{
      console.log(userName, phoneNumber, userAddress, userRole, userId, password);

    // Send a POST request to the server to add the new user
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        userName: userName,
        phoneNumber: phoneNumber,
        userAddress: userAddress,
        userRole: userRole,
        userId: userId,
        password: password,
      }),
    });

    console.log(response);
    }
    
  };

  return (
    <div className={`form-container ${isOpen ? 'visible' : 'hidden'}`}>
      {isOpen && (
        <div>
          <p>Add User</p>
          <hr />
          <div className="form-group">
            <div id="first">
              <p>UserID</p>
              <input
                type="text"
                placeholder="User ID"
                value={selectedUser ? selectedUser.userId : ''}
                onChange={(e) => setUserId(e.currentTarget.value)}
              ></input>
              <p>User Name</p>
              <input
                type="text"
                placeholder="User Name"
                value={selectedUser ? selectedUser.userName : ''}
                onChange={(e) => setUserName(e.currentTarget.value)}
              ></input>
              <p>Address</p>
              <input
                type="text"
                placeholder="Address"
                value={selectedUser ? selectedUser.userAddress : ''}
                onChange={(e) => setUserAddress(e.currentTarget.value)}
              ></input>
            </div>

            <div id="second">
              <p>Phone Number</p>
              <input
                type="text"
                placeholder="Phone Number"
                value={selectedUser ? selectedUser.phoneNumber : ''}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              ></input>
              <p>Position</p>
              <input
                type="text"
                placeholder="User Role"
                value={selectedUser ? selectedUser.userRole : ''}
                onChange={(e) => setUserRole(e.currentTarget.value)}
              ></input>
              <p>Password</p>
              <input
                type="text"
                placeholder="Password"
                value={selectedUser ? selectedUser.userPassword : ''}
                onChange={(e) => setPassword(e.currentTarget.value)}
              ></input>
            </div>
          </div>
          <br />
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="save" onClick={onClick}>Save</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
