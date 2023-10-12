"use client";
import React from 'react';
import './ManageCustomer.css';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import './CustomerTable';
import CustomerTable from './CustomerTable';

function ManageCustomer (){
    return(
        <div className="manageCustomer-container">
            <div className="blue-container">
            <Button 
            href="/role/components/forms/addCustomer"
            style={{backgroundColor:"white", color:"black", width:"200px", height:"50px",fontWeight:"bold", alignSelf:"flex-end", margin:"30px", borderRadius:"10px"}} variant="contained" startIcon={<Add />}>
              New Customer
            </Button>
            <div className="searchContainer">
                <div className="searchContainer-left"> 
                    <p style={{fontWeight:"bold"}}>Show</p>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    
                    <Select
                        id="dropdown"
                        style={{backgroundColor:"white"}}
                        
                    >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem ></MenuItem>
                        <MenuItem ></MenuItem>
                        <MenuItem ></MenuItem>
                    </Select>
                    </FormControl>
                    <p style={{fontWeight:"bold"}}>Entries</p>
                </div>
                <div className="searchContainer-right">
                <p style={{fontWeight:"bold"}}>Search</p>
                <input type="text" id="searchName" name="customerName" /> 
                </div>
            </div>
            <div className="table-container">{CustomerTable()}</div>
            </div>

        </div>
    )
}
export default ManageCustomer;