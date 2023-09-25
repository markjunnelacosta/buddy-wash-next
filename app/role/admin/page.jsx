"use client";
import React, { useState } from "react";

const AdminPage = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [userRole, setUserRole] = useState("");
  const onClick = async () => {
    console.log(userName, password, address, userRole);
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        username: userName,
        password: password,
        userAddress: address,
        userRole: userRole,
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
        onChange={(e) => setUsername(e.currentTarget.value)}
      ></input>
      <input
        type="text"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      ></input>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.currentTarget.value)}
      ></input>
      <input
        type="text"
        placeholder="User Role"
        value={userRole}
        onChange={(e) => setUserRole(e.currentTarget.value)}
      ></input>
      <button onClick={onClick}>Add User</button>
    </div>
  );
};

export default AdminPage;
