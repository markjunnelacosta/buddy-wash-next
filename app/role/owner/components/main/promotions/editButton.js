import React from "react";
import UpdateVoucher from "@/app/role/components/forms/updateVoucher/page";

const EditVoucherPopup = ({ isOpen, voucher, onClose, onSave }) => {
    if (!isOpen) {
        return null;
      }
  return (
    <div className="popup-container">
      <div className="popup">
        <UpdateVoucher
          id={voucher._id}
          voucherName={voucher.voucherName}
          percentageOff={voucher.percentageOff}
          minSpend={voucher.minSpend}
          discountCap={voucher.discountCap}
          usageQuantity={voucher.usageQuantity}
          startTime={voucher.startTime}
          endTime={voucher.endTime}
          voucherCode={voucher.voucherCode}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default EditVoucherPopup;