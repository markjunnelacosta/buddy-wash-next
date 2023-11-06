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

const getBranchStaff = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/branch-staff", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch branch staff");
        }

        const response = await res.json();
        return response.branchStaffData || [];
    } catch (error) {
        console.log("Error loading branch staff: ", error);
    }
};

const getBranchId = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/branch", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch branch");
        }

        const response = await res.json();
        return response.branchData || [];
    } catch (error) {
        console.log("Error loading branch: ", error);
    }
};

const BranchStaff = () => {
    // State variables
    const [branchStaffData, setBranchStaffData] = useState([]);
    const [branchData, setBranchData] = useState(null);
    const [showStaffPage, setShowStaffPage] = useState(false);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isUpdateStaffPopupVisible, setUpdateStaffPopupVisible] = useState('');
    const router = useRouter();

    // Calculate total number of pages based on the data and entries per page
    const totalPages = Math.ceil(branchStaffData.length / entriesPerPage);

    // Calculate the start and end range for displayed entries
    const startRange = (currentPage - 1) * entriesPerPage + 1;
    const endRange = Math.min(currentPage * entriesPerPage, branchStaffData.length);

    // Function to handle going to the previous page
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to handle going to the next page
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to handle changing the number of entries per page
    const handleEntriesPerPageChange = (event) => {
        setEntriesPerPage(event.target.value);
    };

    // Function to open the staff page for adding/editing staff members
    const openStaffPage = () => {
        setShowStaffPage(true);
    };

    // Function to close the staff page
    const closeStaffPage = () => {
        setShowStaffPage(false);
    };

    // Function to handle editing a staff member
    const handleEditStaff = (staff) => {
        setSelectedStaff(staff);
        // Call a function to show the edit staff member popup (if implemented)
        setUpdateStaffPopupVisible(true);
    };

    // Function to close the edit staff member popup (if implemented)
    const handleClose = () => {
        // Hide the popup
        setUpdateStaffPopupVisible(false);
    };

    // Filter staff based on search query
    const filteredStaff = branchStaffData.filter((staff) =>
        staff.staffName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Use an effect to fetch staff data when the component mounts
    useEffect(() => {
        const fetchBranchStaff = async () => {
            try {
                const staff = await getBranchStaff();
                setBranchStaffData(staff);
            } catch (error) {
                console.error("Error fetching Branch Staff:", error);
            }
        };

        fetchBranchStaff();
    }, []);

    //BRANCHID
    useEffect(() => {
        const fetchBranchId = async () => {
            try {
                const branchData = await getBranchId();
                setBranchData(branchData);
            } catch (error) {
                console.error("Error fetching Branch:", error);
            }
        };

        fetchBranchId();
    }, []);


    // Log the branch staff data for debugging
    useEffect(() => {
        console.log(branchStaffData);
    }, [branchStaffData]);

    // Function to fetch data from the server
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

    // Function to handle saving data after adding or editing a staff member
    const handleSaveData = () => {
        closeStaffPage(); // Close the StaffPage
        fetchData(); // Fetch updated data
    };

    return (
        <>
            <Layout />
            <div className="container-box">
                <div className="searchContainer">
                    <div className="searchContainer-right">
                        <p style={{ fontWeight: "bold" }}>Location:</p>
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
                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                        <ArrowBackIosRoundedIcon />
                    </button>
                    <span>{`Showing entries ${startRange}-${endRange} of ${filteredStaff.length}`}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                    >
                        <ArrowForwardIosRoundedIcon />
                    </button>
                </div>
            </div>
            <StaffPage
                isOpen={showStaffPage}
                onClose={handleSaveData}
                onSaveData={handleSaveData}
            />
            <EditStaffPopup
                isOpen={isUpdateStaffPopupVisible}
                staff={selectedStaff}
                onClose={handleClose}
                onSave={handleSaveData} // Implement the save function
            />
        </>
    );
};

export default BranchStaff;
