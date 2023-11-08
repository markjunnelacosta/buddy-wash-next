import React, { useState } from 'react';
import BranchStaff from './branch-staff/page';
import Button from "@mui/material/Button";
import RemoveButton from './removeButton';

const Branch = ({ branch }) => {
    const [isBranchStaffPopupVisible, setBranchStaffPopupVisible] = useState(false);

    const openBranchStaffPopup = () => {
        setBranchStaffPopupVisible(true);
    };

    const closeBranchStaffPopup = () => {
        setBranchStaffPopupVisible(false);
    };

    return (
        <>
            <div className="branch-container">
                <p id="branch-num">Branch {branch.branchNumber}</p>
                <p>Location: {branch.branchAddress}</p>
                <p>Number of Staff: {branch.numberOfStaff === null ? 0 : branch.numberOfStaff}</p>
                <div className="b-container">
                    <Button
                        variant="outlined"
                        id="edit-button"
                        style={{ borderColor: '#b57b24', color: '#b57b24' }}
                        onClick={openBranchStaffPopup}
                    >
                        See Info
                    </Button>
                    &nbsp;
                    <Button
                        variant="outlined"
                        style={{ borderColor: 'blue' }}
                        id="edit-button"
                        onClick={() => handleEditBranch(branch)}
                    >
                        Edit
                    </Button>
                    &nbsp;
                    <RemoveButton id={branch._id} />
                </div>
            </div>

            {isBranchStaffPopupVisible && (
                <div className="branch-staff-popup">
                    <div className="popup-content">
                        <BranchStaff branchId={branch._id} /> {/* Pass the branch ID to BranchStaff */}
                    </div>
                </div>
            )}
        </>
    );
};

export default Branch;