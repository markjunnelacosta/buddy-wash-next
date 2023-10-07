"use client";
import React, { useState } from 'react';
import './AddCustomer.css';

const AddCustomer= () =>{
    const [customerName, setCustomerName]= useState("");
    const [customerNumber, setCustomerNumber]= useState("");

    const onClick = async() => {
        console.log(customerName, customerNumber);

        const response = await fetch("/api/customer", {
            method: "POST",
            body: JSON.stringify({
                customerName: customerName,
                customerNumber: customerNumber,

            }),
        });
        console.log(response);
    };
    return (
        <div className="add-customer-form">
            <div className="new-customer-text">
                <p>New Customer</p>
            </div>
            <div className="input">
                <div className="customer-name"> 
                    <p>Customer Name</p>
                    <input 
                    className="text-box"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.currentTarget.value)} ></input>
                </div>
                <div className="phone-number"> 
                    <p>Phone Number</p>
                    <input 
                    className="text-box"
                    value={customerNumber}
                    onChange={(e)=> setCustomerNumber(e.currentTarget.value)}></input> 
                </div>
            </div>
            <div className="buttons">
                <div >
                    <button 
                    className="button"
                    onClick={onClick}>Save</button>
                    
                </div>
                <div >
                    <button className="button">Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default AddCustomer;