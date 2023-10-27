"use client";
import React from 'react';
import './price.css';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import editPrices from './priceTable';

function Prices() {
    return (
        <div className="prices-container">
            <div className="blue-container">

                <div className="searchContainer-right">
                    <p style={{ color: "black", fontWeight: "bold", alignSelf: "right", margin: "30px" }} variant="contained">
                        Price List
                    </p>
                    <Button style={{ backgroundColor: "white", color: "black", height: "40px", fontWeight: "bold", padding: "100", alignSelf: "right", margin: "30px", borderRadius: "10px" }} variant="contained">
                        New Product
                    </Button>

                </div>
                <div className="table-container">{editPrices()}</div>
            </div>
        </div>
    )
}
export default Prices;