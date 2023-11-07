"use client";
import React, { useState, useEffect } from "react";
import './addLaundry.css'
import { Select } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";

const addLaundry = ({ isOpen, onClose }) => {
    const [customerData, setCustomerData] = useState([]); // State for customers
    const [supplyData, setSupplyData] = useState([]); // State for supplies

    const [customerName, setCustomerName] = useState(null);
    const [orderDate, setOrderDate] = useState("");
    const [weight, setWeight] = useState("");
    const [washMode, setWashMode] = useState("");
    const [dryMode, setDryMode] = useState("");
    const [fold, setFold] = useState("");
    const [colored, setColored] = useState("");
    const [selectedDetergent, setSelectedDetergent] = useState("");
    const [selectedFabCon, setSelectedFabCon] = useState("");
    

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/customer", {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch customer");
                }

                const response = await res.json();
                setCustomerData(response.customers);
            } catch (error) {
                console.error("Error fetching customer:", error);
            }
        };

        fetchCustomer();
    }, []);

    useEffect(() => {
        const fetchSupplies = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/supply", {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch supplies");
                }

                const response = await res.json();
                setSupplyData(response.supplies);
            } catch (error) {
                console.error("Error fetching supplies:", error);
            }
        };

        fetchSupplies();
    }, []);


    return (
        <>
            {isOpen && (
                <div className="form-container visible">
                    <div>
                        <p id="header">Add New Laundry</p>
                        <hr />
                        <div className="customer-info">
                            <p>Customer Name</p>
                            <Autocomplete
                                className="select-name"
                                value={customerName}
                                onChange={(event, newValue) => setCustomerName(newValue)}
                                options={customerData.map((customer) => customer.customerName)}
                                renderInput={(params) => <TextField {...params} variant="outlined" />}
                            />
                            <p>Date</p>
                            <input
                                type="date"
                               value={orderDate}
                               onChange={(e) => setOrderDate(e.currentTarget.value)}
                            ></input>
                        </div>
                        <hr />
                        <div className="form-group">
                            <div id="first">
                                <p>Weight</p>
                                <select>
                                    <option value=""></option>
                                    <option value="option1">Light Clothes - 7.5kilos</option>
                                    <option value="option2">Light Clothes - 8 to 9 kilos</option>
                                </select>
                                <p>Fold</p>
                                <select>
                                    <option value=""></option>
                                    <option value="option1">Yes</option>
                                    <option value="option2">No</option>
                                </select>
                                <p>Detergent</p>
                                <select
                                    className="dropdown"
                                    onChange={(e) => setSelectedDetergent(e.target.value)}
                                >

                                    <option value=""></option>
                                    <option value="">None</option>
                                    {supplyData.map((supplies, i) => (
                                        <option key={i}>{supplies.supplyName}</option>
                                    ))}
                                </select>
                                <p>Detergent Qty.</p>
                                <input
                                    type="number"
                                //   value={userRole}
                                //   onChange={(e) => setUserRole(e.currentTarget.value)}
                                ></input>
                            </div>

                            <div id="second">
                                <p>Wash Mode</p>
                                <select>
                                    <option value=""></option>
                                    <option value="option1">Spin - 9mins.</option>
                                    <option value="option2">Rinse & Spin - 24mins.</option>
                                    <option value="option3">Regular Wash – 37mins.</option>
                                    <option value="option3">Super/Premium Wash – 45mins.</option>
                                </select>
                                <p>Colored</p>
                                <select>
                                    <option value=""></option>
                                    <option value="option1">Yes</option>
                                    <option value="option2">No</option>
                                </select>
                                <p>Fabric Conditioner</p>
                                <select
                                    className="dropdown"
                                    onChange={(e) => setSelectedFabCon(e.target.value)}
                                >
                                    <option value=""></option>
                                    <option value="">None</option>
                                    {supplyData.map((supplies, i) => (
                                        <option key={i}>{supplies.supplyName}</option>
                                    ))}
                                </select>
                                <p>Fabric Conditioner Qty.</p>
                                <input
                                    type="number"
                                //   value={userRole}
                                //   onChange={(e) => setUserRole(e.currentTarget.value)}
                                ></input>
                            </div>

                            <div id="third">
                                <p>Dry Mode</p>
                                <select>
                                    <option value=""></option>
                                    <option value="option1">30mins.</option>
                                    <option value="option2">40mins.</option>
                                    <option value="option3">50mins.</option>
                                </select>
                                <p>Pay by:</p>
                                <div className="radio-label">
                                    <input
                                        id="radiob"
                                        type="radio"
                                        value="cash"
                                        name="paymentMethod"
                                    //   value={userRole}
                                    //   onChange={(e) => setUserRole(e.currentTarget.value)}
                                    /> Cash
                                    <input
                                        id="radiob"
                                        type="radio"
                                        value="gcash"
                                        name="paymentMethod"
                                    //   value={userRole}
                                    //   onChange={(e) => setUserRole(e.currentTarget.value)}
                                    />Gcash
                                </div>
                                <p>Ref. No. for Gcash</p>
                                <input
                                    type="text"
                                //   value={userRole}
                                //   onChange={(e) => setUserRole(e.currentTarget.value)}
                                ></input>
                            </div>

                        </div>
                        <br />
                        <button className="cancel"
                        onClick={onClose}
                        >Cancel</button>
                        <button className="save"
                        // onClick={onClick}
                        >Save</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default addLaundry;