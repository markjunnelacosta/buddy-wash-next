import React from "react";
import UpdateStaff from "./edit-staff/page";

const EditStaffPopup = ({ isOpen, staff, onClose, onSave }) => {
  if (!isOpen) {
    return null; // If not open, don't render anything
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <UpdateStaff
          id={staff._id}
          staffName={staff.staffName}
          staffAddress={staff.staffAddress}
          phoneNumber={staff.phoneNumber}
          staffPosition={staff.staffPosition}
          isOpen={isOpen}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditStaffPopup;
