"use client";
import React from 'react';
import './staff.css';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import DownloadIcon from '@mui/icons-material/Download';
import AddStaff from './staffTable';

function Staff() {
    return (
        <div className="staff-container">
            <div className="blue-container">

                <div className="searchContainer-right">
                    <p style={{ color: "black", fontWeight: "bold", alignSelf: "right", margin: "30px" }} variant="contained">
                        Staff Branch 1
                    </p>

                </div>
                <div className="table-container">{AddStaff()}</div>
            </div>
        </div>
    )
}
export default Staff;