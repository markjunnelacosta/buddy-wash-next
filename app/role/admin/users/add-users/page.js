import React, { useState, useEffect } from "react";
import './addUsers.css';

const AdminPage = ({ isOpen, onClose, selectedUser }) => {
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    userAddress: "",
    userRole: "",
    userId: "",
    password: "",
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        userName: selectedUser.userName || "",
        phoneNumber: selectedUser.phoneNumber || "",
        userAddress: selectedUser.userAddress || "",
        userRole: selectedUser.userRole || "",
        userId: selectedUser.userId || "",
        password: selectedUser.password || "",
      });
    } else {
      setFormData({
        userName: "",
        phoneNumber: "",
        userAddress: "",
        userRole: "",
        userId: "",
        password: "",
      });
    }
  }, [selectedUser]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    const apiUrl = selectedUser
      ? `/api/user/${selectedUser._id}`
      : "/api/user";

      try {
        const response = await fetch(apiUrl, {
          method: selectedUser ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), // Include the updated user data
        });
    
        if (response.status === 200) {
          // Update the user data in your component, or perform any necessary action
          const updatedUser = await response.json();
          console.log('User updated:', updatedUser);
        } else {
          console.error('Error updating user:', response.status);
        }
      } catch (error) {
        console.error('API request failed:', error);
      }

    // Close the form or update user data as needed.
    onClose();
    
  };

  return (
    <div className={`form-container ${isOpen ? 'visible' : 'hidden'}`}>
      {isOpen && (
        <div>
          <p>Add User</p>
          <hr />
          <div className="form-group">
            <div id="first">
              
              <p>User Name</p>
              <input
                type="text"
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleFieldChange}
              />
              <p>Address</p>
              <input
                type="text"
                name="userAddress"
                placeholder="Address"
                value={formData.userAddress}
                onChange={handleFieldChange}
              />
              <p>UserID</p>
              <input
                type="text"
                name="userId"
                placeholder="User ID"
                value={formData.userId}
                onChange={handleFieldChange}
              />
            </div>

            <div id="second">
              <p>Phone Number</p>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleFieldChange}
              />
              <p>Position</p>
              <input
                type="text"
                name="userRole"
                placeholder="User Role"
                value={formData.userRole}
                onChange={handleFieldChange}
              />
              <p>Password</p>
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleFieldChange}
              />
            </div>
          </div>
          <br />
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="save" onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
