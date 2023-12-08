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
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const BranchStaff = ({ onClose, branchId, selectedBranchAddress }) => {
  const [branchStaffData, setBranchStaffData] = useState([]);
  const [showStaffPage, setShowStaffPage] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateStaffPopupVisible, setUpdateStaffPopupVisible] =
    useState(false);
  const [selectedBranchId, setSelectedBranchId] = useState(null);

  const router = useRouter();

  const totalPages = Math.ceil(branchStaffData.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(
    currentPage * entriesPerPage,
    branchStaffData.length
  );

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
  };

  useEffect(() => {
    if (branchId) {
      handleBranchSelection(branchId);
    }
  }, [branchId]);

  useEffect(() => {
    console.log(branchStaffData);
  }, [branchStaffData]);

  useEffect(() => {
    const fetchBranchStaff = async () => {
      try {
        if (branchId !== null && branchId !== undefined) {
          const res = await fetch(
            `/api/branch-staff/${branchId}`,
            {
              cache: "no-store",
            }
          );

          if (!res.ok) {
            throw new Error(
              `Failed to fetch branch staff. Status: ${res.status
              }, Message: ${await res.text()}`
            );
          }

          const response = await res.json();
          setBranchStaffData(response || []);
        }
      } catch (error) {
        console.error("Error loading branch staff:", error);
      }
    };

    fetchBranchStaff();
  }, [branchId]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/branch-staff", {
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

  const handleSaveData = () => {
    closeStaffPage();
    fetchData();
  };

  return (
    <>
      <div className="container-box-staff">
        <div className="searchContainer">
          <div className="searchContainer-right">
            <div className="locs">
              <p style={{ fontWeight: "bold" }}>
                Location: {selectedBranchAddress}
              </p>
            </div>
            <div className="search-bar">
              <p style={{ fontWeight: "bold" }}>Search</p>
              <input
                type="text"
                id="searchName"
                name="staffName"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="button-container">
            <button className="add-button" onClick={openStaffPage}>
              <AddRoundedIcon /> New Staff
            </button>
          </div>
        </div>
        <div className="table-container">
          <TableContainer component={Paper} className="table-border">
            <Table
              stickyHeader
              aria-label="sticky table"
              sx={{ minWidth: 600 }}
              size="small"
            >
              <TableHead>
                <TableRow>
                  <TableCell className="table-header">Name</TableCell>
                  <TableCell className="table-header">Address</TableCell>
                  <TableCell className="table-header">Phone Number</TableCell>
                  <TableCell className="table-header">Position</TableCell>
                  <TableCell className="table-header">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStaff
                  .slice(
                    (currentPage - 1) * entriesPerPage,
                    currentPage * entriesPerPage
                  )
                  .map((staff) => (
                    <TableRow
                      key={staff._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell className="table-body">{staff.staffName}</TableCell>
                      <TableCell className="table-body">{staff.staffAddress}</TableCell>
                      <TableCell className="table-body">{staff.phoneNumber}</TableCell>
                      <TableCell className="table-body">{staff.staffPosition}</TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="pagination">
          <button
            className="entries-button"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ArrowBackIosRoundedIcon />
          </button>
          <span>{`Showing entries ${startRange}-${endRange} of ${totalPages}`}</span>
          <button
            className="entries-button"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosRoundedIcon />
          </button>
        </div>
        <div className="footer">
          <div className="cancel-button">
            <Button className="back-button" onClick={onClose}>
              Back
            </Button>
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
