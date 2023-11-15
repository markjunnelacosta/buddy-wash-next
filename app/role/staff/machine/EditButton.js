import React from 'react';
import UpdateMachine from '@/app/role/components/forms/updateMachine/page';
import UpdateDryer from '@/app/role/components/forms/updateDryer/page';

const EditPopup = ({ isOpen, item, onClose, type }) => {
  if (!isOpen) {
    return null; // If not open, don't render anything
  }

  return (
    <div className="popup-container">
      <div className="popup">
        {type === 'machine' ? (
          <UpdateMachine
            id={item._id}
            machineNumber={item.machineNumber}
            action={item.action}
            timer={item.timer}
            queue={item.queue}
            useCount={item.useCount}
            status={item.status}
            onClose={onClose}
          />
        ) : (
          <UpdateDryer
            id={item._id}
            dryerNumber={item.dryerNumber}
            action={item.action}
            timer={item.timer}
            queue={item.queue}
            useCount={item.useCount}
            status={item.status}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
};

export default EditPopup;
