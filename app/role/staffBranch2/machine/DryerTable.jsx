"use client";
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import EditPopup from "./EditButton";

const API_PATHS = {
  // DRYER: "/api/dryer",
  BRANCH2: "/api/BRANCH2/branch2Dryer",
  // BRANCH3: "/api/BRANCH3/branch3Dryer",
};

function DryerTable() {
  const [dryerData, setDryerData] = useState([]);
  const [selectedDryer, setSelectedDryer] = useState(null);
  const [isEditDryerPopupVisible, setEditDryerPopupVisible] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState("dryerNumber");
  const [order, setOrder] = useState("asc");
  const [currentApiPath, setCurrentApiPath] = useState(API_PATHS.BRANCH2);

  const totalPages = Math.ceil(dryerData.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, dryerData.length);

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

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const descendingComparator = (a, b, orderBy) => {
    if (orderBy === "dryerNumber") {
      const aNum = parseInt(a[orderBy]);
      const bNum = parseInt(b[orderBy]);
      if (isNaN(aNum) || isNaN(bNum)) {
        return String(a[orderBy]).localeCompare(String(b[orderBy]), undefined, {
          numeric: true,
        });
      }
      return bNum - aNum;
    } else {
      if (b[orderBy] < a[orderBy]) return -1;
      if (b[orderBy] > a[orderBy]) return 1;
      return 0;
    }
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const fetchDryer = () => {
    fetch(currentApiPath, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dryer data");
        }
        return response.json();
      })
      .then((data) => {
        setDryerData(data.dryerData || []); // update dryer state
      })
      .catch((error) => {
        console.error("Error fetching dryer data:", error);
      });
  };

  useEffect(() => {
    fetchDryer();
  }, [currentApiPath]);
  console.log("********dryer data", dryerData);

  const handleEditDryer = (dryer) => {
    setSelectedDryer(dryer);
    setEditDryerPopupVisible(true);
  };

  const handleCloseEditDryerPopup = () => {
    setEditDryerPopupVisible(false);
    fetchDryer(); // Refresh data after edit
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  return (
    <div style={{ height: "400px", overflow: "auto" }}>
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table" size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="table-header-bold">
                Dryer No.
              </TableCell>
              <TableCell align="center" className="table-header-bold">
                Action
              </TableCell>
              {/* <TableCell align="center" className="table-header-bold">
                Queue
              </TableCell> */}
              <TableCell align="center" className="table-header-bold">
                Use Count
              </TableCell>
              <TableCell align="center" className="table-header-bold">
                Status
              </TableCell>
              <TableCell align="center" className="table-header-bold">
                Set-up
              </TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {stableSort(dryerData, getComparator(order, orderBy))
              .slice(
                (currentPage - 1) * entriesPerPage,
                currentPage * entriesPerPage
              )
              .map((dryer, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{dryer.dryerNumber}</TableCell>
                  <TableCell align="center">
                    {dryer.timer == "00:00" ||
                    dryer.timer == "0" ||
                    dryer.timer == "tempValue"
                      ? "Off"
                      : "Running"}
                  </TableCell>
                  {/* <TableCell align="center">{dryer.queue}</TableCell> */}
                  <TableCell align="center">{dryer.useCount}</TableCell>
                  <TableCell align="center">
                    {dryer.status === "Operational"
                      ? "Operational"
                      : "Under Maintenance"}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="outlined"
                      onClick={() => handleEditDryer(dryer)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </tbody>
        </Table>
      </TableContainer>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          <ArrowBackIosRoundedIcon />
        </button>
        <span>{`Showing entries ${startRange}-${endRange} of ${totalPages}`}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          <ArrowForwardIosRoundedIcon />
        </button>
      </div>
      <EditPopup
        isOpen={isEditDryerPopupVisible}
        item={selectedDryer}
        onClose={handleCloseEditDryerPopup}
        type="dryer" // Specify the type for dryers
      />
    </div>
  );
}

export default DryerTable;
