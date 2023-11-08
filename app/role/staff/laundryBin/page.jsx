"use client";

import React from 'react';
import './LaundryBin.css';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import AddLaundry from '../../components/forms/addLaundry/page';
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";


const getOrder = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/laundrybin", {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch order");
      }
  
      const response = await res.json();
      return response.laundryData || [];
    } catch (error) {
      console.log("Error loading order: ", error);
    }
  };

const LaundryBin = () => {

    const [laundryData, setLaundryData] = useState([]);
    const [showAddLaundry, setShowAddLaundry] = useState(false);

    const openAddLaundry = () => {
        setShowAddLaundry(true);
    }

    const closeAddLaundry = () => {
        setShowAddLaundry(false);
    }

    useEffect(() => {
        const fetchOrder = async () => {
          try {
            const order = await getOrder();
            setLaundryData(order);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
    
        fetchOrder();
      }, []);
    
      // Log the user data for debugging
      useEffect(() => {
        console.log(laundryData);
      }, [laundryData]);

      const fetchData = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/laundrybin", {
            cache: "no-store",
          });
    
          if (!res.ok) {
            throw new Error("Failed to fetch order");
          }
    
          const response = await res.json();
          const order = response.laundryData || [];
          setUserData(order); // Assuming you want to update the user data in your component state
        } catch (error) {
          console.log("Error loading orders: ", error);
        }
      };

      const handleSaveData = () => {
        closeAddLaundry(); // Close the AdminPage
        fetchData();
      };
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
                                        <TableCell className='table-header'>Date </TableCell>
                                        <TableCell className='table-header'>Name</TableCell>
                                        <TableCell className='table-header'>Machine No. </TableCell>
                                        <TableCell className='table-header'>Action</TableCell>
                                        <TableCell className='table-header'>Timer</TableCell>
                                        <TableCell className='table-header'>Dryer No. </TableCell>
                                        <TableCell className='table-header'>Action</TableCell>
                                        <TableCell className='table-header'>Timer</TableCell>
                                        <TableCell className='table-header'>Status</TableCell>

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
                onSaveData={handleSaveData}
            />
        </>
    )
}
export default LaundryBin;

