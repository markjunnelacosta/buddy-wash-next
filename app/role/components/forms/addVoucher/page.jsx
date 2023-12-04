"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Add } from "@mui/icons-material";
import './addVoucher.css'

export default function AddVoucher() {
    const [voucherName, setVoucherName] = useState("");
    const [percentageOff, setPercentageOff] = useState("");
    const [minSpend, setMinSpend] = useState("");
    const [discountCap, setDiscountCap] = useState("");
    const [usageQuantity, setUsageQuantity] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [voucherCode, setVoucherCode] = useState("");
    const [voucherNameError, setVoucherNameError] = useState('');
    const [percentageOffError, setPercentageOffError] = useState('');
    const [minSpendError, setMinSpendError] = useState('');
    const [discountCapError, setDiscountCapError] = useState('');
    const [usageQuantityError, setUsageQuantityError] = useState('');
    const [startTimeError, setStartTimeError] = useState('');
    const [endTimeError, setEndTimeError] = useState('');
    const [voucherCodeError, setVoucherCodeError] = useState('');

    const handleVoucherNameChange = (e) => {
        const newValue = e.target.value;
        setVoucherName(newValue);

        if (!/^[a-zA-Z\s]*$/.test(newValue)) {
            setVoucherNameError('Please enter valid characters (letters and spaces)');
        } else {
            setVoucherNameError('');
        }
    };

    const handlePercentageOffChange = (e) => {
        const newValue = e.target.value;
        setPercentageOff(newValue);

        if (!/^\d*\.?\d*$/.test(newValue) || newValue < 0 || newValue > 100) {
            setPercentageOffError('Please enter a valid percentage between 0 and 100');
        } else {
            setPercentageOffError('');
        }
    };

    const handleMinSpendChange = (e) => {
        const newValue = e.target.value;
        setMinSpend(newValue);

        if (!/^(?:₱\s?)?[0-9]+(?:\.[0-9]{1,2})?$/.test(newValue)) {
            setMinSpendError('Please enter a valid currency amount');
        } else {
            setMinSpendError('');
            setMinSpend(formatAsCurrency(newValue));
        }
    };

    const handleDiscountCapChange = (e) => {
        const newValue = e.target.value;
        setDiscountCap(newValue);

        if (!/^(?:₱\s?)?[0-9]+(?:\.[0-9]{1,2})?$/.test(newValue)) {
            setDiscountCapError('Please enter a valid currency amount');
        } else {
            setDiscountCapError('');
            setDiscountCap(formatAsCurrency(newValue));
        }
    };

    const formatAsCurrency = (value) => {
        if (isNaN(value) || value === null) {
            return value; // Return the original value if not a number
        }
        // Use Intl.NumberFormat for currency formatting
        const formatter = new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
            minimumFractionDigits: 2, // Minimum number of decimal places
            maximumFractionDigits: 2, // Maximum number of decimal places
        });

        return formatter.format(value); // Placeholder, replace with actual formatting logic
    };

    const handleUsageQuantityChange = (e) => {
        const newValue = e.target.value;
        setUsageQuantity(newValue);

        if (!/^\d*\.?\d*$/.test(newValue)) {
            setUsageQuantityError('Please enter valid numbers');
        } else {
            setUsageQuantityError('');
        }
    };

    const handleStartTimeChange = (e) => {
        const newValue = e.target.value;
        setStartTime(newValue);

        if (!/^\d{4}-\d{2}-\d{2}$/.test(newValue)) {
            setStartTimeError('Please enter a valid date in the format YYYY-MM-DD');
        } else {
            setStartTimeError('');
        }
    };

    const handleEndTimeChange = (e) => {
        const newValue = e.target.value;
        setEndTime(newValue);

        if (!/^\d{4}-\d{2}-\d{2}$/.test(newValue)) {
            setEndTimeError('Please enter a valid date in the format YYYY-MM-DD');
        } else {
            setEndTimeError('');
        }
    };

    const handleVoucherCodeChange = (e) => {
        const newValue = e.target.value;
        setVoucherCode(newValue);

        if (!/^[a-zA-Z\s]*$/.test(newValue)) {
            setVoucherCodeError('Please enter valid characters (letters and spaces)');
        } else {
            setVoucherCodeError('');
        }
    };

    const generateRandomCode = () => {
        const randomCode = Math.floor(100000 + Math.random() * 900000);
        setVoucherCode(randomCode.toString());
    };

    useEffect(() => {
        generateRandomCode();
    }, []);

    //   const handleVoucherPriceChange = (e) => {
    //     const newValue = e.target.value;
    //     setVoucherPrice(newValue);

    //     if (!/^\d*\.?\d*$/.test(newValue)) {
    //       setVoucherPriceError('Please enter valid numbers');
    //     } else {
    //       setVoucherPriceError('');
    //     }
    //   };

    const onClickSave = async () => {
        if (voucherNameError || percentageOffError || minSpendError || discountCapError || usageQuantityError || startTimeError || endTimeError || voucherCodeError) {
            return; // Don't submit if there are input errors
        }

        const response = await fetch("/api/voucher", {
            method: "POST",
            body: JSON.stringify({
                voucherName: voucherName,
                percentageOff: percentageOff,
                minSpend: minSpend,
                discountCap: discountCap,
                usageQuantity: usageQuantity,
                startTime: startTime,
                endTime: endTime,
                voucherCode: voucherCode
                // availableStock: 0,
                // productPrice: productPrice,
            }),
        });
        if (response.ok) {
            handleClose();
        } else {
            console.log("Failed to add voucher");
        }
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setVoucherName("");
        setPercentageOff("");
        setMinSpend("");
        setDiscountCap("");
        setUsageQuantity("");
        setStartTime("");
        setEndTime("");
        setVoucherCode("");
        setVoucherNameError('');
        setPercentageOffError('');
        setMinSpendError('');
        setDiscountCapError('');
        setUsageQuantityError('');
        setStartTimeError('');
        setEndTimeError('');
        setVoucherCodeError('');
    };

    return (
        <div>
            <Button
                style={{
                    backgroundColor: "white",
                    color: "black",
                    width: "200px",
                    height: "50px",
                    fontWeight: "bold",
                    alignSelf: "flex-start",
                    margin: "30px 30px 20px 0px",
                    borderRadius: "10px",
                }}
                variant="contained"
                onClick={handleClickOpen}
                startIcon={<Add />}
            >
                New Voucher
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Voucher</DialogTitle>
                <DialogContent>
                    <div className="add-voucher-form">
                        <div className="input">
                            <div className="voucher-name">
                                <p>Voucher Name</p>
                                <TextField
                                    className="text-box"
                                    value={voucherName}
                                    onChange={handleVoucherNameChange}
                                    error={!!voucherNameError}
                                    helperText={voucherNameError}
                                />
                            </div>
                            <div className="percentage-off">
                                <p>Percentage Off</p>
                                <TextField
                                    className="text-box"
                                    value={percentageOff}
                                    onChange={handlePercentageOffChange}
                                    error={!!percentageOffError}
                                    helperText={percentageOffError}
                                />
                            </div>
                            <div className="min-spend">
                                <p>Min. Spend</p>
                                <TextField
                                    className="text-box"
                                    value={minSpend}
                                    onChange={handleMinSpendChange}
                                    error={!!minSpendError}
                                    helperText={minSpendError}
                                />
                            </div>
                            <div className="discount-cap">
                                <p>Discount Cap</p>
                                <TextField
                                    className="text-box"
                                    value={discountCap}
                                    onChange={handleDiscountCapChange}
                                    error={!!discountCapError}
                                    helperText={discountCapError}
                                />
                            </div>
                            <div className="usage-quantity">
                                <p>Usage Quantity</p>
                                <TextField
                                    className="text-box"
                                    value={usageQuantity}
                                    onChange={handleUsageQuantityChange}
                                    error={!!usageQuantityError}
                                    helperText={usageQuantityError}
                                />
                            </div>
                            <div className="start-time">
                                <p>Start Time</p>
                                <TextField
                                    type="date"
                                    value={startTime}
                                    onChange={handleStartTimeChange}
                                    error={!!startTimeError}
                                    helperText={startTimeError}
                                />
                            </div>
                            <div className="end-time">
                                <p>End Time</p>
                                <TextField
                                    type="date"
                                    value={endTime}
                                    onChange={handleEndTimeChange}
                                    error={!!endTimeError}
                                    helperText={endTimeError}
                                />
                            </div>
                            <div className="voucher-code">
                                <p>Voucher Code</p>
                                <TextField
                                    className="text-box"
                                    value={voucherCode}
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
                        onClick={onClickSave}
                    >
                        Save
                    </Button>
                    <Button
                        className="dialog-button"
                        onClick={handleClose}
                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
