"use client";
import React from 'react'
import { useState, useEffect } from 'react';
import './editBranch.css'
import { useRouter } from "next/navigation";

export default function UpdateBranch({
    id,
    branchNumber,
    branchAddress,
    onClose,
}) {
    const [newBranchAddress, setNewBranchAddress] = useState(branchAddress);
    const [newBranchNumber, setNewBranchNumber] = useState(branchNumber);

    const router = useRouter();

    const handleSave = async (e) => {
        e.preventDefault();
        console.log({
            id,
            newBranchAddress,
            newBranchNumber,
        });

        try {
            const res = await fetch(`/api/branch/${id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                },

                body: JSON.stringify({
                    id,
                    newBranchAddress,
                    newBranchNumber,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to update branch details");
            }

            onClose();

            window.location.reload();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
                <div className="form-container-edit visible">
                    <p>Edit Branch</p> <hr />
                    <div className='form-group-edit'>
                        <p></p>
                        <p>Branch Number</p>
                        <input
                        id='edit-input'
                            onChange={(e) => setNewBranchNumber(e.target.value)}
                            value={newBranchNumber}
                        />
                        <p>Branch Address</p>
                        <input
                        id='edit-input'
                            onChange={(e) => setNewBranchAddress(e.target.value)}
                            value={newBranchAddress}
                        />

                    </div>

                    <br />
                    {/* Cancel button */}
                    <button className="cancel" onClick={onClose}>Cancel</button>
                    {/* Save button */}
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
        </>
    )
}
