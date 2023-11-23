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

    useEffect(() => {
        const fetchLaundryMode = async () => {
          try {
            const mode = await getLaundryMode();
            setUserData(mode);
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
          setLaundryModeData(mode); // Assuming you want to update the user data in your component state
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
                                    <Paper style={{ width: "100%" }}>
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
                                        </Table>
                                    </Paper>
                                </TableContainer>
                            </div>
                        </div>
                        <div className="dry-mode">
                            <p>Dry Mode:</p>
                            <div className="table-container">
                                <TableContainer component={Paper}>
                                    <Paper style={{ width: "100%" }}>
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
        </>
    );
}

export default LaundryPrice;