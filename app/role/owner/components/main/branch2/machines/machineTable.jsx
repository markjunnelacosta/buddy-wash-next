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

function MachineTable() {
  const [machineData, setMachineData] = useState([]);
  const [newMachine, setNewMachine] = useState('');
  const [inputError, setInputError] = useState('');

  const addNewMachine = () => {
    if (isValidInput(newMachine)) {
      if (!isNumberRepeated(newMachine)) {
        const newMachineObject = {
          machineNumber: parseInt(newMachine),
          // action: 'Off',
          queue: 0,
          useCount: 0,
          // status: 'Operational',
        };

        fetch('/api/machine', {
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
    return machineData.some((machine) => machine.machineNumber === parseInt(number));
  };

  const fetchData = () => {
    fetch('/api/machine', {
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
      })
      .catch((error) => {
        console.error('Error fetching machine data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="add-machine-form" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
            if (!/^\d*$/.test(inputValue) || inputValue < 1 || inputValue > 25) {
              e.preventDefault();
            }
          }}
          inputProps={{
            maxLength: 2, // maximum 2 digits
          }}
        />
        <Button variant="outlined" color="primary" onClick={addNewMachine} style={{ marginRight: '10px', color: 'blue', borderColor: 'blue' }}>
          Add
        </Button>
      </div>
      <div style={{ height: '400px', overflow: 'auto' }}>
        <TableContainer component={Paper}>
          <Table
            stickyHeader
            aria-label="sticky table"
            size="small"
          >
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
            {machineData
                .filter((machine) => machine.branchNumber === "2")
                .map((machine, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{machine.machineNumber}</TableCell>
                  <TableCell align="center">
                    {machine.action === 'Running' ? 'Running' : 'Off'}
                  </TableCell>
                  <TableCell align="center">{machine.queue}</TableCell>
                  <TableCell align="center">{machine.useCount}</TableCell>
                  <TableCell align="center">
                    {machine.status === 'Operational' ? 'Operational' : 'Under Maintenance'}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default MachineTable;
