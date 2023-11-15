import React from "react";
import UpdateSupply from "@/app/role/components/forms/updateSupply/page";

const EditSupplyPopup = ({ isOpen, supply, onClose, onSave }) => {
    if (!isOpen) {
        return null;
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
