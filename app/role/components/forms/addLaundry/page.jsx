"use client";
import React, { useState } from "react";
import './addLaundry.css'


const addLaundry = () => {
    //   const [userName, setUserName] = useState("");
    //   const [phoneNumber, setPhoneNumber] = useState("");
    //   const [userAddress, setUserAddress] = useState("");
    //   const [userRole, setUserRole] = useState("");
    //   const [userId, setUserId] = useState("");
    //   const [password, setPassword] = useState("");


    //   const onClick = async () => {
    //     console.log(userName, phoneNumber, userAddress, userRole, userId, password);
    //     const response = await fetch("/api/user", {
    //       method: "POST",
    //       body: JSON.stringify({
    //         userName: userName,
    //         phoneNumber: phoneNumber,
    //         userAddress: userAddress,
    //         userRole: userRole,
    //         userId: userId,
    //         password: password,
    //       }),
    //     });

    //     console.log(response);

    //     onSaveData();
    //     onClose();
    //   };

    return (
        <>
            {/* {isOpen && ( */}
            <div className="form-container visible">
                <div>
                    <p id="header">Add New Laundry</p>
                    <hr />
                    <div className="customer-info">
                        <p>Customer Name</p>
                        <input
                            type="text"
                        //   value={userName}
                        //   onChange={(e) => setUserName(e.currentTarget.value)}
                        ></input>

                        <p>Date</p>
                        <input
                            type="date"
                        //   value={phoneNumber}
                        //   onChange={(e) => setPhoneNumber(e.currentTarget.value)}
                        ></input>
                    </div>
                    <hr />
                    <div className="form-group">
                        <div id="first">
                            <p>Weight</p>
                            <select>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                            <p>Fold</p>
                            <select>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                            <p>Detergent</p>
                            <select>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
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
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                            <p>Colored</p>
                            <select>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                            <p>Fabric Conditioner</p>
                            <select>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
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
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
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
                    // onClick={onClose}
                    >Cancel</button>
                    <button className="save"
                    // onClick={onClick}
                    >Save</button>
                </div>
            </div>
            {/* )} */}
        </>
    );
};

export default addLaundry;