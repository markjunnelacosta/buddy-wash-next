"use client";

import React from 'react';
import './LaundryBin.css';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import DenseTable from './Table';
import { useState } from 'react';
import AddLaundry from '../../components/forms/addLaundry/page';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const LaundryBin = () => {

    const [showAddLaundry, setShowAddLaundry] = useState(false);

    const openAddLaundry = () => {
        setShowAddLaundry(true);
    }

    const closeAddLaundry = () => {
        setShowAddLaundry(false);
    }
    return (
        <>
            <div className="laundryBin-container">
                <div className="blue-container">
                    <Button style={{ backgroundColor: "white", color: "black", width: "200px", height: "50px", fontWeight: "bold", alignSelf: "flex-end", margin: "30px", borderRadius: "10px" }}
                        variant="contained"
                        startIcon={<Add />}
                        onClick={openAddLaundry}>
                        New Laundry
                    </Button>

                    <div className='table-container'>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow >
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Date </TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Name</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Machine No. </TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Action</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Timer</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Dryer No. </TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Action</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Timer</TableCell>
                                    <TableCell align="center" style={{ fontWeight: "bold" }}>Status</TableCell>

                                </TableRow>
                            </TableHead>
                        </Table>
                    </TableContainer>
                </div>
                </div>
                
            </div>

            <AddLaundry
                isOpen={showAddLaundry}
                onClose={closeAddLaundry}
            />
        </>
    )
}
export default LaundryBin;

