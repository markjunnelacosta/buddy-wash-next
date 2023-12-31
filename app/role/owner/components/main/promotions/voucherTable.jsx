"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./voucherTable.css";
import EditVoucherPopup from "./editButton";
import RemoveButton from "./removeButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { Typography } from "@mui/material";

const getVouchers = async () => {
    try {
        const res = await fetch("/api/voucher", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch vouchers");
        }

        // console.log(await res.json());
        const response = await res.json();
        return response.vouchers;
    } catch (error) {
        console.error("Error loading vouchers:", error);
        throw error;
    }
};

const formatCurrency = (value, currencySymbol) => {
    const formatter = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
        minimumFractionDigits: 2,
    });

    return formatter.format(value);
};

const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "numeric", minute: "numeric", };
    const formattedDate = new Date(dateString).toLocaleDateString("en-US", options);
    return formattedDate;
};

const VoucherTable = (voucherFilter) => {
    const [vouchers, setVouchers] = React.useState([]);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isUpdateVoucherPopupVisible, setUpdateVoucherPopupVisible] = useState(false);
    const [entriesPerPage, setEntriesPerPage] = useState(3);
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(vouchers.length / entriesPerPage);
    const startRange = (currentPage - 1) * entriesPerPage + 1;
    const endRange = Math.min(currentPage * entriesPerPage, vouchers.length);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleEditVoucher = (voucher) => {
        setSelectedVoucher(voucher);
        setUpdateVoucherPopupVisible(true);
    };

    const handleClose = () => {
        setUpdateVoucherPopupVisible(false); // Hide the popup
    };

    const filterVouchers = (vouchers, filter) => {
        const currentDate = new Date();

        return vouchers.filter((voucher) => {
            if (filter === "active") {
                return new Date(voucher.endTime) > currentDate;
            } else if (filter === "expired") {
                return new Date(voucher.endTime) <= currentDate;
            }
            return true;
        });
    };

    const filteredVouchers = filterVouchers(vouchers, voucherFilter);

    React.useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const vouchersData = await getVouchers();
                setVouchers(vouchersData);
            } catch (error) {
                console.error("Error fetching vouchers:", error);
            }
        };

        fetchVouchers();
    }, []);

    React.useEffect(() => {
        console.log(vouchers);
    }, [vouchers]);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/voucher", {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch voucher");
            }

            const response = await res.json();
            const vouchers = response.userData || [];
            setVouchers(vouchers);
        } catch (error) {
            console.log("Error loading vouchers: ", error);
        }
    };

    const handleSaveData = () => {
        fetchData();
    };


    return (
        <>
            <TableContainer component={Paper}>
                <Paper style={{ height: 345, width: "100%" }}>
                    <Table
                        stickyHeader
                        aria-label="sticky table"
                        // sx={{ minWidth: 650 }}
                        size="small"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    Voucher Name
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    Percentage Off
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    Min. Spend
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    Discount Cap
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    Usage Quantity
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    Start Time
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    End Time
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    Voucher Code
                                </TableCell>
                                <TableCell align="center" style={{ fontWeight: "bold" }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredVouchers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={9} align="center">
                                        <Typography variant="body2" color="textSecondary">
                                            No voucher data available for the selected criteria.
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {filteredVouchers
                                .slice(
                                    (currentPage - 1) * entriesPerPage,
                                    currentPage * entriesPerPage
                                )
                                .map((voucher) => (
                                    <TableRow
                                        key={voucher._id}
                                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {voucher.voucherName}
                                        </TableCell>
                                        <TableCell align="center">{`${voucher.percentageOff}%`}</TableCell>
                                        <TableCell align="center">{formatCurrency(voucher.minSpend, "₱")}</TableCell>
                                        <TableCell align="center">{formatCurrency(voucher.discountCap, "₱")}</TableCell>
                                        <TableCell align="center">{voucher.usageQuantity}</TableCell>
                                        <TableCell align="center">{formatDate(voucher.startTime)}</TableCell>
                                        <TableCell align="center">{formatDate(voucher.endTime)}</TableCell>
                                        <TableCell align="center">{voucher.voucherCode}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="outlined" id="edit-button" onClick={() => handleEditVoucher(voucher)}>
                                                Edit
                                            </Button>
                                            <RemoveButton id={voucher._id} />
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </Paper>
            </TableContainer>
            <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                    <ArrowBackIosRoundedIcon />
                </button>
                <span>{`Showing entries ${startRange}-${endRange} of ${totalPages}`}</span>
                <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    <ArrowForwardIosRoundedIcon />
                </button>
            </div>
            <EditVoucherPopup
                isOpen={isUpdateVoucherPopupVisible}
                voucher={selectedVoucher}
                onClose={handleClose}
                onSave={handleSaveData}
            />
        </>
    );
};

export default VoucherTable;
