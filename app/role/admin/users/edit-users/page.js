"use client";
import React, { useState, useEffect } from "react";
import "./editUsers.css";
import { useRouter } from "next/navigation";

export default function UpdateUser({
  id,
  userName,
  phoneNumber,
  userAddress,
  userRole,
  userId,
  password,
  onClose,
}) {
  const [newUserName, setNewUserName] = useState(userName);
  const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
  const [newUserAddress, setNewUserAddress] = useState(userAddress);
  const [newUserRole, setNewUserRole] = useState(userRole);
  const [newUserId, setNewUserId] = useState(userId);
  const [newPassword, setNewPassword] = useState(password);

  const router = useRouter();

  const handleSave = async (e) => {
    e.preventDefault();
    if (
      !newUserName ||
      !newPhoneNumber ||
      !newUserAddress || 
      !newUserRole ||
      !newUserId ||
      !newPassword
    ) { 
      alert("Please fill in all required fields.");
      return;
    }

    const numberRegex = /^\d+$/;
    if (!numberRegex.test(newPhoneNumber)) {
      alert("Invalid characters in phone number. Please enter a valid number.");
      return;
    }

    const nameRegex = /^[a-zA-Z ]+$/;
    if (!nameRegex.test(newUserName)) {
      alert("Invalid characters in user name. Please enter a valid name.");
      return;
    }
    console.log({
      id,
      newUserName,
      newPhoneNumber,
      newUserAddress,
      newUserRole,
      newUserId,
      newPassword,
    });
    try {
      const res = await fetch(`/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify({
          id,
          newUserName,
          newPhoneNumber,
          newUserAddress,
          newUserRole,
          newUserId,
          newPassword,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user details");
      }

      onClose();
      window.location.reload();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="form-container">
        <div>
          <p>Edit User</p>
          <hr />
          <div className="form-group">
            <div id="first">
              <p>User Name</p>
              <input
                onChange={(e) => setNewUserName(e.target.value)}
                value={newUserName}
              />
              <p>Address</p>
              <input
                onChange={(e) => setNewUserAddress(e.target.value)}
                value={newUserAddress}
              />
              <p>UserID</p>
              <input
                onChange={(e) => setNewUserId(e.target.value)}
                value={newUserId}
              />
            </div>

            <div id="second">
              <p>Phone Number</p>
              <input
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                value={newPhoneNumber}
              />
              <p>Position</p>
              {/* <input
                onChange={(e) => setNewUserRole(e.target.value)}
                value={newUserRole}
              /> */}
              <select
                onChange={(e) => setNewUserRole(e.target.value)}
                value={newUserRole}
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="owner">Owner</option>
              </select>
              <p>Password</p>
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
          </div>
          <br />
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
