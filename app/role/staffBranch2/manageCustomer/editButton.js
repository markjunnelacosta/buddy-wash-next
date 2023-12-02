// EditUserPopup.js
import React from "react";
import UpdateCustomerForm from "../../components/forms/BRANCH2/updateCustomer/page";

const EditCustomerPopup = ({ isOpen, customer, onClose }) => {
  if (!isOpen) {
    return null; // If not open, don't render anything
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <UpdateCustomerForm
          id={customer._id}
          customerName={customer.customerName}
          customerNumber={customer.customerNumber}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditCustomerPopup;
