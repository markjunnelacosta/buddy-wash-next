import React from 'react';
import './AddCustomer.css';

function AddCustomer (){
    return (
        <div className="add-customer-form">
            <div className="new-customer-text">
                <p>New Customer</p>
            </div>
            <div className="input">
                <div className="customer-name"> 
                    <p>Customer Name</p>
                    <input className="text-box"></input>
                </div>
                <div className="phone-number"> 
                    <p>Phone Number</p>
                    <input className="text-box"></input> 
                </div>
            </div>
            <div className="buttons">
                <div >
                    <button className="button">Save</button>
                    
                </div>
                <div >
                    <button className="button">Cancel</button>
                </div>
            </div>
        </div>
    )
}
export default AddCustomer;