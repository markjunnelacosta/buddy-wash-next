"use client";
import React, { useState, useEffect } from "react";
import Layout from "../../components/layout";
import "./branchStaff.css";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Button from "@mui/material/Button";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import StaffPage from "./add-staff/page";
import RemoveButton from "./removeButton";
import EditStaffPopup from "./eButton";
import { useRouter } from "next/navigation";

const BranchStaff = ({ onClose, branchId, selectedBranchAddress }) => {
    const [branchStaffData, setBranchStaffData] = useState([]);
    const [showStaffPage, setShowStaffPage] = useState(false);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpdateStaffPopupVisible, setUpdateStaffPopupVisible] = useState(false);
    const [selectedBranchId, setSelectedBranchId] = useState(null);

    const router = useRouter();

    const totalPages = Math.ceil(branchStaffData.length / entriesPerPage);
    const startRange = (currentPage - 1) * entriesPerPage + 1;
    const endRange = Math.min(currentPage * entriesPerPage, branchStaffData.length);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(event.target.value);
    };

    const openStaffPage = () => {
        setShowStaffPage(true);
    };

    const closeStaffPage = () => {
        setShowStaffPage(false);
    };

    const handleEditStaff = (staff) => {
        setSelectedStaff(staff);
        setUpdateStaffPopupVisible(true);
    };

    const handleClose = () => {
        setUpdateStaffPopupVisible(false);
    };

    const filteredStaff = branchStaffData.filter((staff) =>
        staff.staffName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleBranchSelection = (branchId) => {
        setSelectedBranchId(branchId);
        fetchStaffByBranch(branchId);
    };

    useEffect(() => {
        if (branchId) {
            handleBranchSelection(branchId);
        }
    }, [branchId]);

    useEffect(() => {
        const fetchBranchStaff = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/branch-staff?branchId=${branchId}`, {
                    cache: "no-store",
                });
    
                if (!res.ok) {
                    throw new Error(`Failed to fetch branch staff. Status: ${res.status}, Message: ${await res.text()}`);
                }
    
                const response = await res.json();
                setBranchStaffData(response.branchStaffData || []);
            } catch (error) {
                console.error("Error loading branch staff:", error);
            }
        };
    
        if (branchId) {
            fetchBranchStaff();
        }
    }, [branchId]);
    

    useEffect(() => {
        console.log(branchStaffData);
    }, [branchStaffData]);

    const fetchData = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/branch-staff", {
                cache: "no-store",
            });

            if (!res.ok) {
                throw new Error("Failed to fetch Branch Staff");
            }

            const response = await res.json();
            const staff = response.branchStaffData || [];
            setBranchStaffData(staff);
        } catch (error) {
            console.log("Error loading branch staff: ", error);
        }
    };

    const fetchStaffByBranch = async (branchId) => {
        try {
            const res = await fetch(`http://localhost:3000/api/branch-staff?branchId=${branchId}`, {
                cache: 'no-store',
            });

            if (!res.ok) {
                throw new Error('Failed to fetch staff members for the branch');
            }

            const response = await res.json();
            setBranchStaffData(response.branchStaffData);
        } catch (error) {
            console.error('Error fetching branch staff:', error);
        }
    };

    const handleSaveData = () => {
        closeStaffPage();
        fetchData();
    };

    console.log('branchId in BranchStaff:', selectedBranchId);

    return (
        <>
            <div className="container-box-staff">
                <div className="searchContainer">
                    <div className="searchContainer-right">
                        <p style={{ fontWeight: "bold" }}>Location: {selectedBranchAddress}</p>
                        <p style={{ fontWeight: "bold" }}>Search</p>
                        <input
                            type="text"
                            id="searchName"
                            name="staffName"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <button className="add-button" onClick={openStaffPage}>
                            <AddRoundedIcon /> New Staff
                        </button>
                    </div>
                </div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Position</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaff
                                .slice(
                                    (currentPage - 1) * entriesPerPage,
                                    currentPage * entriesPerPage
                                )
                                .map((staff) => (
                                    <tr key={staff._id}>
                                        <td>{staff.staffName}</td>
                                        <td>{staff.staffAddress}</td>
                                        <td>{staff.phoneNumber}</td>
                                        <td>{staff.staffPosition}</td>
                                        <td>
                                            <div className="b-container">
                                                <Button
                                                    variant="outlined"
                                                    id="edit-button"
                                                    onClick={() => handleEditStaff(staff)}
                                                >
                                                    Edit
                                                </Button>
                                                &nbsp;
                                                <RemoveButton id={staff._id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
                <div className="footer">
                    <div className="cancel-button">
                        <Button className="back-button" onClick={onClose}>Back</Button>
                    </div>

                    <div className="pagination">
                        <button className="entries-button" onClick={handlePreviousPage} disabled={currentPage === 1}>
                            <ArrowBackIosRoundedIcon />
                        </button>
                        <span>{`Showing entries ${startRange}-${endRange} of ${filteredStaff.length}`}</span>
                        <button className="entries-button"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <ArrowForwardIosRoundedIcon />
                        </button>
                    </div>
                </div>
            </div>

            <StaffPage
                isOpen={showStaffPage}
                onClose={handleSaveData}
                onSaveData={handleSaveData}
                branchId={selectedBranchId}
            />
            <EditStaffPopup
                isOpen={isUpdateStaffPopupVisible}
                staff={selectedStaff}
                onClose={handleClose}
                onSave={handleSaveData}
            />
        </>
    );
};

export default BranchStaff;
