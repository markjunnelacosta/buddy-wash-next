// EditUserPopup.js
import React from "react";
import UpdateUser from "./edit-users/page";

const EditUserPopup = ({ isOpen, user, onClose, onSave }) => {
  if (!isOpen) {
    return null; // If not open, don't render anything
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <UpdateUser
          id={user._id}
          userName={user.userName}
          phoneNumber={user.phoneNumber}
          userAddress={user.userAddress}
          userRole={user.userRole}
          userId={user.userId}
          password={user.password}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditUserPopup;
