"use client";

import React from 'react';
import './LaundryBin.css';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import DenseTable from './Table';
import { useState } from 'react';
import AddLaundry from '../../components/forms/addLaundry/page';

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
                    <div className="table-container">
                        {DenseTable()}
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

