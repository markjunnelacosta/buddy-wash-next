"use client";
import React, { useState } from "react";
import './editStaff.css'
import { useRouter } from "next/navigation";


export default function UpdateStaff({
    id,
    staffName,
    staffAddress,
    phoneNumber,
    staffPosition,
    onClose,
}) {
    const [newStaffName, setNewStaffName] = useState(staffName);
    const [newStaffAddress, setNewStaffAddress] = useState(staffAddress);
    const [newPhoneNumber, setNewPhoneNumber] = useState(phoneNumber);
    const [newStaffPosition, setNewStaffPosition] = useState(staffPosition);

    const router = useRouter();

    const handleSave = async (e) => {
        e.preventDefault();
        if (
            !newStaffName ||
            !newStaffAddress ||
            !newPhoneNumber ||
            !newStaffPosition
        ) {
            alert("Please fill in all required fields.");
            return;
        }

        const nameRegex = /^[a-zA-Z ]+$/;
        if (!nameRegex.test(newStaffName)) {
            alert("Invalid characters in staff name. Please enter a valid name.");
            return;
        }

        const numberRegex = /^\d+$/;
        if (!numberRegex.test(phoneNumber)) {
            alert("Invalid characters in phone number. Please enter a valid number.");
            return;
        }


        console.log({
            id,
            newStaffName,
            newStaffAddress,
            newPhoneNumber,
            newStaffPosition,
        });

        try {
            const res = await fetch(`/api/branch-staff/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },

                body: JSON.stringify({
                    id,
                    newStaffName,
                    newStaffAddress,
                    newPhoneNumber,
                    newStaffPosition,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update branch staff details");
            }

            onClose();

            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div className="form-container visible">
                <div>
                    <p>New Staff</p>
                    <hr />
                    <div className="form-group">
                        <div id="first">
                            <p>Name</p>
                            <input
                                value={newStaffName}
                                onChange={(e) => setNewStaffName(e.currentTarget.value)}
                            ></input>
                            <p>Address</p>
                            <input
                                value={newStaffAddress}
                                onChange={(e) => setNewStaffAddress(e.currentTarget.value)}
                            ></input>
                        </div>

                        <div id="second">
                            <p>Phone Number</p>
                            <input
                                value={newPhoneNumber}
                                onChange={(e) => setNewPhoneNumber(e.currentTarget.value)}
                            ></input>
                            <p>Position</p>
                            <select
                                value={newStaffPosition}
                                onChange={(e) => setNewStaffPosition(e.currentTarget.value)}
                            >
                                <option value=""></option>
                                <option value="Staff">Staff</option>
                                <option value="Guard">Guard</option>
                                <option value="Technician">Technician</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                    </div>
                    <br />
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </>
    );
};