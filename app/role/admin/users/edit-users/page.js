"use client";
import React, { useState, useEffect } from "react";
import './editUsers.css';
import { useRouter } from 'next/navigation';

export default function UpdateUser({
  id,
  userName,
  phoneNumber,
  userAddress,
  userRole,
  userId,
  password,
  onClose
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

    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id, newUserName, newPhoneNumber, newUserAddress, newUserRole, newUserId, newPassword }),
      });

      if (!res.ok) {
        throw new Error("Failed to update user details");
      }

      router.refresh();
      router.push("/role/admin/users");
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <>
    <form>
    <div className="form-container visible">
          <div>
            <p>Add User</p>
            <hr />
            <div className="form-group">
              <div id="first">
                {/* User Name input */}
                <p>User Name</p>
                <input
                  onChange={(e) => setNewUserName(e.target.value)}
                  value={newUserName}
                />
                {/* Address input */}
                <p>Address</p>
                <input
                  value={newUserAddress}
                  onChange={(e) => setNewUserAddress(e.target.value)}
                />
                {/* User ID input */}
                <p>UserID</p>
                <input
                  value={newUserId}
                  onChange={(e) => setNewUserId(e.target.value)}
                />
              </div>

              <div id="second">
                {/* Phone Number input */}
                <p>Phone Number</p>
                <input
                  value={newPhoneNumber}
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
                {/* User Role input */}
                <p>Position</p>
                <input
                   value={newUserRole}
                   onChange={(e) => setNewUserRole(e.target.value)}
                />
                {/* Password input */}
                <p>Password</p>
                <input
                   value={newPassword}
                   onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <br />
            <button className="cancel" onClick={onClose}>Cancel</button>
            <button className="save" onClick={handleSave}>Save</button>
          </div>
        </div>
    </form>
        
    </>
  );
};
