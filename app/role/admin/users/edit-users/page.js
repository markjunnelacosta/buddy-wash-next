"use client";
import React, { useState, useEffect } from "react";
import './editUsers.css';
import { useRouter } from 'next/navigation';

// const AdminPage = ({ isOpen, onClose, selectedUser }) => {
//   // State to store form data
//   const [formData, setFormData] = useState({
//     userName: "",
//     phoneNumber: "",
//     userAddress: "",
//     userRole: "",
//     userId: "",
//     password: "",
//   });


//   // Effect to update form data when selectedUser changes
//   useEffect(() => {
//     if (selectedUser) {
//       // Initialize form data with selectedUser values
//       setFormData({
//         userName: selectedUser.userName || "",
//         phoneNumber: selectedUser.phoneNumber || "",
//         userAddress: selectedUser.userAddress || "",
//         userRole: selectedUser.userRole || "",
//         userId: selectedUser.userId || "",
//         password: selectedUser.password || "",
//       });
//     } else {
//       // Reset form data when there is no selectedUser
//       setFormData({
//         userName: "",
//         phoneNumber: "",
//         userAddress: "",
//         userRole: "",
//         userId: "",
//         password: "",
//       });
//     }
//   }, [selectedUser]);

//   // Handle form field changes
//   const handleFieldChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//  const handleSave = async () => {
//   // Define the API endpoint URL
//   const apiUrl = selectedUser ? `/api/user/${selectedUser._id}` : "/api/user";

//   try {
//     // Make an API request to create or update the user
//     const response = await fetch(apiUrl, {
//       method: selectedUser ? 'PUT' : 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData), // Include the updated user data
//     });

//     if (response.status === 200) {
//       // User updated successfully
//       const updatedUser = await response.json();
//       console.log('User updated:', updatedUser);

//       // Update the local state with the updated user
//       const updatedUserData = userData.map(user => {
//         if (user._id === updatedUser._id) {
//           return updatedUser;
//         }
//         return user;
//       });

//       setUserData(updatedUserData); // Update the user data in your component state

//       // Close the AdminPage
//       setShowAdminPage(false);
//     } else {
//       console.error('Error updating user:', response.status);
//     }
//   } catch (error) {
//     console.error('API request failed:', error);
//   }
// };

export function UpdateUser({
  id,
  userName,
  phoneNumber,
  userAddress,
  userRole,
  userId,
  password,
  isOpen,
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
      )}
    </>
  );
};

export default UpdateUser;
