import React from 'react'
import Layout from '../components/layout';
import './page.css'

function Users() {
  return (
    <>
      <Layout />
      <div className="container-box">
        this is users!
      </div>
    </>
  )
}

export default Users

/*
"use client";
import React, { useState } from "react";

const AdminPage = () => {
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
    <div>
      <input
        type="text"
        placeholder="User Name"
        value={userName}
        onChange={(e) => setUserName(e.currentTarget.value)}
      ></input>
      <input
        type="text"
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.currentTarget.value)}
      ></input>
      <input
        type="text"
        placeholder="Address"
        value={userAddress}
        onChange={(e) => setUserAddress(e.currentTarget.value)}
      ></input>
      <input
        type="text"
        placeholder="User Role"
        value={userRole}
        onChange={(e) => setUserRole(e.currentTarget.value)}
      ></input>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.currentTarget.value)}
      ></input>
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></input>
      
      
      <button onClick={onClick}>Add User</button>
    </div>
  );
};

export default AdminPage;
*/