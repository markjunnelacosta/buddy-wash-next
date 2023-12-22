"use client";
import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import TableSortLabel from "@mui/material/TableSortLabel";

const API_PATHS = {
  MACHINE: "/api/BRANCH3/branch3Machine",
  // BRANCH1: "/api/machine",
  // BRANCH2: "/api/BRANCH2/branch2Machine",
};

function MachineTable() {
  const [machineData, setMachineData] = useState([]);
  const [newMachine, setNewMachine] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputError, setInputError] = useState('');
  const [orderBy, setOrderBy] = useState("machineNumber");
  const [order, setOrder] = useState("asc");
  const [currentApiPath, setCurrentApiPath] = useState(API_PATHS.MACHINE);

  const totalPages = Math.ceil(machineData.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, machineData.length);

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
    if (orderBy === 'machineNumber') {
      const aNum = parseInt(a[orderBy]);
      const bNum = parseInt(b[orderBy]);
      if (isNaN(aNum) || isNaN(bNum)) {
        return String(a[orderBy]).localeCompare(String(b[orderBy]), undefined, { numeric: true });
      }
      return bNum - aNum;
    } else {
      if (b[orderBy] < a[orderBy]) return -1;
      if (b[orderBy] > a[orderBy]) return 1;
      return 0;
    }
  };

  const getComparator = (order, orderBy) => {
    return order === 'desc'
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

  const addNewMachine = () => {
    if (isValidInput(newMachine)) {
      if (!isNumberRepeated(newMachine)) {
        const newMachineObject = {
          machineNumber: parseInt(newMachine),
          // action: 'Off',
          // timer: '00:00',
          queue: 0,
          useCount: 0,
          // status: 'Operational',
        };

        fetch(currentApiPath, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newMachineObject),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to add a new machine');
            }
            return response.json();
          })
          .then((data) => {
            fetchData();
          })
          .catch((error) => {
            console.error('Error adding a new machine:', error);
          });

        setMachineData((prevData) => [...prevData, newMachineObject]);
        setNewMachine('');
        setInputError('');
      } else {
        setInputError('The number already exists');
      }
    } else {
      setInputError('Please enter a valid integer between 1 and 25');
    }
  };

  const isValidInput = (input) => {
    const number = parseInt(input);
    return !isNaN(number) && number >= 1 && number <= 25;
  };

  const isNumberRepeated = (number) => {
    const inputMachineNumber = parseInt(number);
    return machineData.some(
      (machine) => machine.machineNumber.toString() === inputMachineNumber.toString()
    );
  };

  const fetchData = () => {
    fetch(currentApiPath, {
      cache: 'no-store',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch machine data');
        }
        return response.json();
      })
      .then((data) => {
        setMachineData(data.machineData || []); // update machineData state

        const machineNumbers = data.machineData.map((machine) => machine.machineNumber);
        console.log("Machine numbers in the database:", machineNumbers);
      })
      .catch((error) => {
        console.error('Error fetching machine data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [currentApiPath]);

  return (
    <div>
      <div
        className="add-machine-form"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <TextField
          label="Washer Number"
          value={newMachine}
          onChange={(e) => setNewMachine(e.target.value)}
          variant="outlined"
          id="machineNumberInput"
          style={{ marginLeft: '10px' }}
          error={inputError !== ''}
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
          onClick={addNewMachine}
          style={{ marginRight: '10px', color: 'blue', borderColor: 'blue' }}
        >
          Add
        </Button>
      </div>
      <div style={{ height: '400px', overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center" className="table-header-bold">
                  Washer No.
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Action
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Queue
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Use Count
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {stableSort(machineData, getComparator(order, orderBy))
                // .filter((machine) => machine.branchNumber === "3")
                .slice(
                  (currentPage - 1) * entriesPerPage,
                  currentPage * entriesPerPage
                )
                .map((machine, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">
                      {machine.machineNumber}
                    </TableCell>
                    <TableCell align="center">
                      {machine.timer == "00:00" ||
                        machine.timer == "0" ||
                        machine.timer == "tempValue"
                        ? "Off"
                        : "Running"}
                    </TableCell>
                    <TableCell align="center">{machine.queue}</TableCell>
                    <TableCell align="center">{machine.useCount}</TableCell>
                    <TableCell align="center">
                      {machine.status === 'Operational'
                        ? 'Operational'
                        : 'Under Maintenance'}
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

export default MachineTable;
