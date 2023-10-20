import React, { useState, useEffect } from "react";
import './addUsers.css';

const AdminPage = ({ isOpen, onClose, selectedUser }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    userAddress: "",
    userRole: "",
    userId: "",
    password: "",
  });


  // Effect to update form data when selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      // Initialize form data with selectedUser values
      setFormData({
        userName: selectedUser.userName || "",
        phoneNumber: selectedUser.phoneNumber || "",
        userAddress: selectedUser.userAddress || "",
        userRole: selectedUser.userRole || "",
        userId: selectedUser.userId || "",
        password: selectedUser.password || "",
      });
    } else {
      // Reset form data when there is no selectedUser
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

  // Handle form field changes
  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    // Define the API endpoint URL
    const apiUrl = selectedUser ? `/api/user/${selectedUser._id}` : "/api/user";
  
    try {
      // Make an API request to create or update the user
      const response = await fetch(apiUrl, {
        method: selectedUser ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Include the updated user data
      });
  
      if (response.status === 200) {
        // User updated successfully
        const updatedUser = await response.json();
        console.log('User updated:', updatedUser);
  
        // Update the local state with the updated user
        const updatedUserData = userData.map(user => {
          if (user._id === updatedUser._id) {
            return updatedUser;
          }
          return user;
        });
  
        setUserData(updatedUserData);
  
        // Close the AdminPage
        setShowAdminPage(false);
      } else {
        console.error('Error updating user:', response.status);
      }
    } catch (error) {
      console.error('API request failed:', error);
    }
  };
  
  return (
    <>
      {isOpen && (
        <div className="form-container visible">
          <div>
            <p>Add User</p>
            <hr />
            <div className="form-group">
              <div id="first">
                {/* User Name input */}
                <p>User Name</p>
                <input
                  type="text"
                  name="userName"
                  placeholder="User Name"
                  value={formData.userName}
                  onChange={handleFieldChange}
                />
                {/* Address input */}
                <p>Address</p>
                <input
                  type="text"
                  name="userAddress"
                  placeholder="Address"
                  value={formData.userAddress}
                  onChange={handleFieldChange}
                />
                {/* User ID input */}
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
                {/* Phone Number input */}
                <p>Phone Number</p>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleFieldChange}
                />
                {/* User Role input */}
                <p>Position</p>
                <input
                  type="text"
                  name="userRole"
                  placeholder="User Role"
                  value={formData.userRole}
                  onChange={handleFieldChange}
                />
                {/* Password input */}
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
            {/* Cancel button */}
            <button className="cancel" onClick={onClose}>Cancel</button>
            {/* Save button */}
            <button className="save" onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPage;
