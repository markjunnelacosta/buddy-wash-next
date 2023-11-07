"use client";
import React, { useState, useEffect } from "react";
import './addLaundry.css'

const getCustomer = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/customer", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch customer");
        }

        // console.log(await res.json());
        const response = await res.json();
        return response.customers;
    } catch (error) {
        console.log("Error loading customers: ", error);
    }
};

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

    const [order, setOrder] = useState([]);
    const [name, setName] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerData = await getCustomer();
        setOrder(customerData);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomer();
  }, []);

  useEffect(() => {}, [order]);

    return (
        <>
            {/* {isOpen && ( */}
            <div className="form-container visible">
                <div>
                    <p id="header">Add New Laundry</p>
                    <hr />
                    <div className="customer-info">
                        <p>Customer Name</p>
                        <select
                            className="dropdown"
                            onChange={(e) => setName(e.target.value)}
                        >
                            <option value=""></option>
                            {order.map((customer, i) => (
                                <option key={i}>{customer.customerName}</option>
                            ))}
                        </select>

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