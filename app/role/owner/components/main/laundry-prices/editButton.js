import React from "react";
import UpdateLaundryMode from "@/app/role/components/forms/updateLaundryMode/page";

const EditLaundryPopup = ({ isOpen, mode, onClose, onSave }) => {
    if (!isOpen) {
        return null;
      }
  return (
    <div className="popup-container">
      <div className="popup">
        <UpdateLaundryMode
          id={mode._id}
          modeName={mode.modeName}
          price={mode.price}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditLaundryPopup;