import React from "react";
import UpdateSupply from "@/app/role/components/forms/BRANCH2/updateSupply/page";

const EditSupplyPopup = ({ isOpen, supply, onClose, onSave }) => {
  if (!isOpen) {
    return null; // If not open, don't render anything
  }
  return (
    <div className="popup-container">
      <div className="popup">
        <UpdateSupply
          id={supply._id}
          supplyName={supply.supplyName}
          productPrice={supply.productPrice}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditSupplyPopup;
