import React from "react";
import UpdateBranch from "./edit-branch/page";

const EditBranchPopup = ({ isOpen, branch, onClose, onSave }) => {
  if (!isOpen) {
    return null; // If not open, don't render anything
  }

  return (
    <div className="popup-container">
      <div className="popup">
        <UpdateBranch
          id={branch._id}
          branchAddress={branch.branchAddress}
          branchNumber={branch.branchNumber}
          isOpen={isOpen}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditBranchPopup;
