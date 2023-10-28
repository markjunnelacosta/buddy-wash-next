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
        console.log({
            id,
            newStaffName,
            newStaffAddress,
            newPhoneNumber,
            newStaffPosition,
        });

        try {
            const res = await fetch(`http://localhost:3000/api/branch-staff/${id}`, {
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
            {isOpen && (
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
                                    value={phoneNumber}
                                    onChange={(e) => setNewPhoneNumber(e.currentTarget.value)}
                                ></input>
                                <p>Position</p>
                                <input
                                    type="text"
                                    value={newStaffPosition}
                                    onChange={(e) => setNewStaffPosition(e.currentTarget.value)}
                                ></input>
                            </div>

                        </div>
                        <br />
                        <button className="cancel" onClick={onClose}>Cancel</button>
                        <button className="save" onClick={handleSave}>Save</button>
                    </div>
                </div>
            )}



        </>
    );
};