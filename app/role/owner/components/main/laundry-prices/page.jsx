"use client";
import React from "react";
import "./laundryPrice.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import AddLaundryMode from "@/app/role/components/forms/addLaundryMode/page";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import RemoveButton from "./removeButton";
import UpdateLaundryMode from "@/app/role/components/forms/updateLaundryMode/page";
import EditLaundryPopup from "./editButton";

const getLaundryMode = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/laundry-price", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch laundry mode data");
        }

        const response = await res.json();
        return response.laundryModeData || [];
    } catch (error) {
        console.log("Error loading laundry mode data: ", error);
    }
};

const LaundryPrice = () => {
    const [laundryModeData, setLaundryModeData] = useState([]);
    const [showLaundryMode, setLaundryMode] = useState(false);
    const [selectedLaundry, setSelectedLaundry] = useState(null);
    const [editPopup, setEditPopup] = useState(false);

    const openLaundryMode = () => {
        setLaundryMode(true);
    }

    const closeLaundryMode = () => {
        setLaundryMode(false);
    }

    const handleSaveData = () => {
        closeLaundryMode();
        fetchData();
    }

    const editLaundryMode = (mode) => {
        setSelectedLaundry(mode);
        setEditPopup(true);
    }

    const handleClose = () => {
        setEditPopup(false);
    }

    useEffect(() => {
        const fetchLaundryMode = async () => {
            try {
                const mode = await getLaundryMode();
                setLaundryModeData(mode);
            } catch (error) {
                console.error("Error fetching laundry mode data:", error);
            }
        };

        fetchLaundryMode();
    }, []);

    useEffect(() => {
        console.log(laundryModeData);
    }, [laundryModeData]);

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/laundry-price", {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch laundry mode data");
            }

            const response = await res.json();
            const mode = response.laundryModeData || [];
            setLaundryModeData(mode);
        } catch (error) {
            console.log("Error loading laundry mode data: ", error);
        }
    };

    return (
        <>
            <div className="price-container">
                <div className="blue-container">
                    <div className="add-mode">
                        <button className="save" onClick={openLaundryMode}>
                            <AddRoundedIcon style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                            Laundry Mode
                        </button>
                    </div>
                    <div className="laundry-mode">
                        <div className="wash-mode">
                            <p>Wash Mode:</p>
                            <div className="table-container">
                                <TableContainer component={Paper}>
                                    <Paper style={{ height: 125, width: "100%" }}>
                                        <Table
                                            stickyHeader
                                            aria-label="sticky table"
                                            size="small"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Price
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Action
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {laundryModeData
                                                    .filter((mode) => mode.category === 'Wash')
                                                    .map((mode) => (
                                                        <TableRow
                                                            key={mode._id}
                                                            sx={{
                                                                "&:last-child td, &:last-child th": { border: 0 },
                                                            }}
                                                        >
                                                            <TableCell className="table-body">{mode.modeName}</TableCell>
                                                            <TableCell className="table-body">{mode.price}</TableCell>
                                                            <TableCell className="table-body">
                                                                <div className="b-container">
                                                                    <Button
                                                                        variant="outlined"
                                                                        id="edit-button"
                                                                        onClick={() => editLaundryMode(mode)}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    &nbsp;
                                                                    <RemoveButton id={mode._id} />
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </TableContainer>
                            </div>
                        </div>
                        <div className="dry-mode">
                            <p>Dry Mode:</p>
                            <div className="table-container">
                                <TableContainer component={Paper}>
                                    <Paper style={{ height: 125, width: "100%" }}>
                                        <Table
                                            stickyHeader
                                            aria-label="sticky table"
                                            size="small"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Price
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Action
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {laundryModeData
                                                    .filter((mode) => mode.category === 'Dry')
                                                    .map((mode) => (
                                                        <TableRow
                                                            key={mode._id}
                                                            sx={{
                                                                "&:last-child td, &:last-child th": { border: 0 },
                                                            }}
                                                        >
                                                            <TableCell className="table-body">{mode.modeName}</TableCell>
                                                            <TableCell className="table-body">{mode.price}</TableCell>
                                                            <TableCell className="table-body">
                                                                <div className="b-container">
                                                                    <Button
                                                                        variant="outlined"
                                                                        id="edit-button"
                                                                        onClick={() => editLaundryMode(mode)}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    &nbsp;
                                                                    <RemoveButton id={mode._id} />
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </TableContainer>
                            </div>
                        </div>
                        <div className="weight">
                            <p>Weight:</p>
                            <div className="table-container">
                                <TableContainer component={Paper}>
                                    <Paper style={{ height: 125, width: "100%" }}>
                                        <Table
                                            stickyHeader
                                            aria-label="sticky table"
                                            size="small"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Price
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Action
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {laundryModeData
                                                    .filter((mode) => mode.category === 'Weight')
                                                    .map((mode) => (
                                                        <TableRow
                                                            key={mode._id}
                                                            sx={{
                                                                "&:last-child td, &:last-child th": { border: 0 },
                                                            }}
                                                        >
                                                            <TableCell className="table-body">{mode.modeName}</TableCell>
                                                            <TableCell className="table-body">{mode.price}</TableCell>
                                                            <TableCell className="table-body">
                                                                <div className="b-container">
                                                                    <Button
                                                                        variant="outlined"
                                                                        id="edit-button"
                                                                        onClick={() => editLaundryMode(mode)}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    &nbsp;
                                                                    <RemoveButton id={mode._id} />
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </TableContainer>
                            </div>
                        </div>
                        <div className="weight">
                            <p>Fold:</p>
                            <div className="table-container">
                                <TableContainer component={Paper}>
                                    <Paper style={{ height: 125, width: "100%" }}>
                                        <Table
                                            stickyHeader
                                            aria-label="sticky table"
                                            size="small"
                                        >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Name
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Price
                                                    </TableCell>
                                                    <TableCell align="center" style={{ fontWeight: "bold" }}>
                                                        Action
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {laundryModeData
                                                    .filter((mode) => mode.category === 'Fold')
                                                    .map((mode) => (
                                                        <TableRow
                                                            key={mode._id}
                                                            sx={{
                                                                "&:last-child td, &:last-child th": { border: 0 },
                                                            }}
                                                        >
                                                            <TableCell className="table-body">{mode.modeName}</TableCell>
                                                            <TableCell className="table-body">{mode.price}</TableCell>
                                                            <TableCell className="table-body">
                                                                <div className="b-container">
                                                                    <Button
                                                                        variant="outlined"
                                                                        id="edit-button"
                                                                        onClick={() => editLaundryMode(mode)}
                                                                    >
                                                                        Edit
                                                                    </Button>
                                                                    &nbsp;
                                                                    <RemoveButton id={mode._id} />
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </Paper>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AddLaundryMode
                isOpen={showLaundryMode}
                onClose={closeLaundryMode}
                onSaveData={handleSaveData}
            />
            <EditLaundryPopup
                isOpen={editPopup}
                mode={selectedLaundry}
                onClose={handleClose}
                onSave={handleSaveData}
            />
        </>
    );
}

export default LaundryPrice;