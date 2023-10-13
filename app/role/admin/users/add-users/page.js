"use client";
import React, { useState } from "react";
import './addUsers.css'


const AdminPage = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");


  const onClick = async () => {
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
      }),
    });

    console.log(response);
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
                value={userId}
                onChange={(e) => setUserId(e.currentTarget.value)}
              ></input>
              <p>User Name</p>
              <input
                type="text"
                placeholder="User Name"
                value={userName}
                onChange={(e) => setUserName(e.currentTarget.value)}
              ></input>
              <p>Address</p>
              <input
                type="text"
                placeholder="Address"
                value={userAddress}
                onChange={(e) => setUserAddress(e.currentTarget.value)}
              ></input>
            </div>

            <div id="second">
              <p>Phone Number</p>
              <input
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.currentTarget.value)}
              ></input>
              <p>Position</p>
              <input
                type="text"
                placeholder="User Role"
                value={userRole}
                onChange={(e) => setUserRole(e.currentTarget.value)}
              ></input>
              <p>Password</p>
              <input
                type="text"
                placeholder="Password"
                value={password}
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