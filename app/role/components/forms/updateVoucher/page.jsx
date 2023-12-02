"use client";
import React, { useState } from "react";
import "./editVoucher.css";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useRouter } from "next/navigation";

export default function UpdateVoucher({
    id,
    voucherName,
    percentageOff,
    minSpend,
    discountCap,
    usageQuantity,
    startTime,
    endTime,
    voucherCode,
}) {
    const [newVoucherName, setNewVoucherName] = useState(voucherName);
    const [newPercentageOff, setNewPercentageOff] = useState(percentageOff);
    const [newMinSpend, setNewMinSpend] = useState(minSpend);
    const [newDiscountCap, setNewDiscountCap] = useState(discountCap);
    const [newUsageQuantity, setNewUsageQuantity] = useState(usageQuantity);
    const [newStartTime, setNewStartTime] = useState(startTime);
    const [newEndTime, setNewEndTime] = useState(endTime);
    const [newVoucherCode, setNewVoucherCode] = useState(voucherCode);
    const [voucherNameError, setVoucherNameError] = useState('');
    const [percentageOffError, setPercentageOffError] = useState('');
    const [minSpendError, setMinSpendError] = useState('');
    const [discountCapError, setDiscountCapError] = useState('');
    const [usageQuantityError, setUsageQuantityError] = useState('');
    const [startTimeError, setStartTimeError] = useState('');
    const [endTimeError, setEndTimeError] = useState('');
    const [voucherCodeError, setVoucherCodeError] = useState('');
    const router = useRouter();

    const handleVoucherNameChange = (e) => {
        const newValue = e.target.value;
        setNewVoucherName(newValue);

        if (!/^[a-zA-Z\s]*$/.test(newValue)) {
            setVoucherNameError('Please enter valid characters (letters and spaces)');
        } else {
            setVoucherNameError('');
        }
    };

    const handlePercentageOffChange = (e) => {
        const newValue = e.target.value;
        setNewPercentageOff(newValue);

        if (!/^\d*\.?\d*$/.test(newValue)) {
            setPercentageOffError('Please enter valid numbers');
        } else {
            setPercentageOffError('');
        }
    };

    const handleMinSpendChange = (e) => {
        const newValue = e.target.value;
        setNewMinSpend(newValue);

        if (!/^\d*\.?\d*$/.test(newValue)) {
            setMinSpendError('Please enter valid numbers');
        } else {
            setMinSpendError('');
        }
    };

    const handleDiscountCapChange = (e) => {
        const newValue = e.target.value;
        setNewDiscountCap(newValue);

        if (!/^\d*\.?\d*$/.test(newValue)) {
            setDiscountCapError('Please enter valid numbers');
        } else {
            setDiscountCapError('');
        }
    };

    const handleUsageQuantityChange = (e) => {
        const newValue = e.target.value;
        setNewUsageQuantity(newValue);

        if (!/^\d*\.?\d*$/.test(newValue)) {
            setUsageQuantityError('Please enter valid numbers');
        } else {
            setUsageQuantityError('');
        }
    };

    const handleStartTimeChange = (e) => {
        const newValue = e.target.value;
        setNewStartTime(newValue);

        if (!/^\d*\.?\d*$/.test(newValue)) {
            setStartTimeError('Please enter valid numbers');
        } else {
            setStartTimeError('');
        }
    };

    const handleEndTimeChange = (e) => {
        const newValue = e.target.value;
        setNewEndTime(newValue);

        if (!/^\d*\.?\d*$/.test(newValue)) {
            setEndTimeError('Please enter valid numbers');
        } else {
            setEndTimeError('');
        }
    };

    const handleVoucherCodeChange = (e) => {
        const newValue = e.target.value;
        setNewVoucherCode(newValue);

        if (!/^[a-zA-Z\s]*$/.test(newValue)) {
            setVoucherNameError('Please enter valid characters (letters and spaces)');
        } else {
            setVoucherCodeError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (voucherNameError || percentageOffError || minSpendError || discountCapError || usageQuantityError || startTimeError || endTimeError || voucherCodeError) {
            return; // Don't submit if there are input errors
        }

        try {
            const res = await fetch(`/api/voucher/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ id, newVoucherName, newPercentageOff, newMinSpend, newDiscountCap, newUsageQuantity, newStartTime, newEndTime, newVoucherCode }),
            });

            if (!res.ok) {
                throw new Error("Failed to update voucher details");
            }

            router.refresh();
            router.push("/role/owner/components/main/promotions");

            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="box-container" style={{ zIndex: 9999 }}>
            <DialogTitle>Edit Voucher</DialogTitle>
            <hr />
            <DialogContent>
                <div className="add-voucher-form">
                    <div className="input">
                    <div className="voucher-name">
                                <p>Voucher Name</p>
                                <TextField
                                    className="text-box"
                                    value={newVoucherName}
                                    onChange={handleVoucherNameChange}
                                    error={!!voucherNameError}
                                    helperText={voucherNameError}
                                />
                            </div>
                            <div className="percentage-off">
                                <p>Percentage Off</p>
                                <TextField
                                    className="text-box"
                                    value={newPercentageOff}
                                    onChange={handlePercentageOffChange}
                                    error={!!percentageOffError}
                                    helperText={percentageOffError}
                                />
                            </div>
                            <div className="min-spend">
                                <p>Min. Spend</p>
                                <TextField
                                    className="text-box"
                                    value={newMinSpend}
                                    onChange={handleMinSpendChange}
                                    error={!!minSpendError}
                                    helperText={minSpendError}
                                />
                            </div>
                            <div className="discount-cap">
                                <p>Discount Cap</p>
                                <TextField
                                    className="text-box"
                                    value={newDiscountCap}
                                    onChange={handleDiscountCapChange}
                                    error={!!discountCapError}
                                    helperText={discountCapError}
                                />
                            </div>
                            <div className="usage-quantity">
                                <p>Usage Quantity</p>
                                <TextField
                                    className="text-box"
                                    value={newUsageQuantity}
                                    onChange={handleUsageQuantityChange}
                                    error={!!usageQuantityError}
                                    helperText={usageQuantityError}
                                />
                            </div>
                            <div className="start-time">
                                <p>Start Time</p>
                                <TextField
                                    className="text-box"
                                    value={newStartTime}
                                    onChange={handleStartTimeChange}
                                    error={!!startTimeError}
                                    helperText={startTimeError}
                                />
                            </div>
                            <div className="end-time">
                                <p>End Time</p>
                                <TextField
                                    className="text-box"
                                    value={newEndTime}
                                    onChange={handleEndTimeChange}
                                    error={!!endTimeError}
                                    helperText={endTimeError}
                                />
                            </div>
                            <div className="voucher-code">
                                <p>Voucher Code</p>
                                <TextField
                                    className="text-box"
                                    value={newVoucherCode}
                                    onChange={handleVoucherCodeChange}
                                    error={!!voucherCodeError}
                                    helperText={voucherCodeError}
                                />
                            </div>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    href="/role/owner/components/main/promotions"
                    className="dialog-button"
                    onClick={handleSubmit}
                >
                    Save
                </Button>
                <Button className="dialog-button" onClick={handleClose} href="/role/owner/components/main/promotions">
                    Cancel
                </Button>
            </DialogActions>
        </div>
    );
}
