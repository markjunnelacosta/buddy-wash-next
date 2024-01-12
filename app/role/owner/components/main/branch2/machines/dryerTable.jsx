"use client";
import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import TableSortLabel from "@mui/material/TableSortLabel";

const API_PATHS = {
  DRYER: "/api/BRANCH2/branch2Dryer",
  // BRANCH1: "/api/dryer",
  // BRANCH3: "/api/BRANCH3/branch3Dryer",
};

function DryerTable() {
  const [dryerData, setDryerData] = useState([]);
  const [newDryer, setNewDryer] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputError, setInputError] = useState("");
  const [orderBy, setOrderBy] = useState("dryerNumber");
  const [order, setOrder] = useState("asc");
  const [currentApiPath, setCurrentApiPath] = useState(API_PATHS.DRYER);

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

  const addNewDryer = () => {
    if (isValidInput(newDryer)) {
      if (!isNumberRepeated(newDryer)) {
        const newDryerObject = {
          dryerNumber: parseInt(newDryer),
          // action: 'Off',
          // timer: '00:00',
          queue: 0,
          useCount: 0,
          // status: 'Operational',
        };

        fetch(currentApiPath, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newDryerObject),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to add a new dryer");
            }
            return response.json();
          })
          .then((data) => {
            fetchData();
          })
          .catch((error) => {
            console.error("Error adding a new dryer:", error);
          });

        setDryerData((prevData) => [...prevData, newDryerObject]);
        setNewDryer("");
        setInputError("");
      } else {
        setInputError("The number already exists");
      }
    } else {
      setInputError("Please enter a valid integer between 1 and 25");
    }
  };

  const isValidInput = (input) => {
    const number = parseInt(input);
    return !isNaN(number) && number >= 1 && number <= 25;
  };

  const isNumberRepeated = (number) => {
    const inputDryerNumber = parseInt(number);
    return dryerData.some(
      (dryer) => dryer.dryerNumber.toString() === inputDryerNumber.toString()
    );
  };

  const fetchData = () => {
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
        setDryerData(data.dryerData || []); // update dryerData state

        const dryerNumbers = data.dryerData.map((dryer) => dryer.dryerNumber);
        console.log("Dryer numbers in the database:", dryerNumbers);
      })
      .catch((error) => {
        console.error("Error fetching dryer data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentApiPath]);

  return (
    <div>
      <div
        className="add-dryer-form"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          label="Dryer Number"
          value={newDryer}
          onChange={(e) => setNewDryer(e.target.value)}
          variant="outlined"
          id="dryerNumberInput"
          style={{ marginLeft: "10px" }}
          error={inputError !== ""}
          helperText={inputError}
          onInput={(e) => {
            const inputValue = e.target.value;
            if (
              !/^\d*$/.test(inputValue) ||
              inputValue < 1 ||
              inputValue > 25
            ) {
              e.preventDefault();
            }
          }}
          inputProps={{
            maxLength: 2, // maximum 2 digits
          }}
        />
        <Button
          variant="outlined"
          color="primary"
          onClick={addNewDryer}
          style={{ marginRight: "10px", color: "blue", borderColor: "blue" }}
        >
          Add
        </Button>
      </div>
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
              </TableRow>
            </TableHead>
            <tbody>
              {stableSort(dryerData, getComparator(order, orderBy))
                // .filter((dryer) => dryer.branchNumber == "2")
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
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ArrowForwardIosRoundedIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default DryerTable;
