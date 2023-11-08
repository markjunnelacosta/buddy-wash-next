import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function DryerTable() {
  const [dryerData, setDryerData] = useState([]);
  const [newDryer, setNewDryer] = useState({ number: '' });
  const [inputError, setInputError] = useState('');

  const addNewDryer = () => {
    if (isValidInput(newDryer.number)) {
      if (!isNumberRepeated(newDryer.number)) {
        setDryerData((prevData) => {
          const newDryerData = [
            ...prevData,
            {
              id: prevData.length + 1, // Generate a unique ID
              action: 'Off',
              timer: '0:00',
              queue: 0,
              useCount: 0,
              number: newDryer.number,
            },
          ];
  
          return newDryerData;
        });
  
        setNewDryer({ number: '' });
        setInputError(''); // Reset the error message
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
    return dryerData.some((dryer) => dryer.number === number);
  };

  useEffect(() => {
    // You can load dryer data from your database here or use an empty array initially
    const initialDryerData = [
      { id: 1, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '1' },
      { id: 2, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '2' },
      { id: 3, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '3' },
      { id: 4, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '4' },
      { id: 5, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '5' }
      // Add more dryers as needed
    ];
    setDryerData(initialDryerData);
  }, []);

  return (
    <div>
      <div className="add-dryer-form" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          label="Dryer Number"
          value={newDryer.number}
          onChange={(e) => setNewDryer({ ...newDryer, number: e.target.value })}
          variant="outlined"
          id="dryerNumberInput"
          error={inputError !== ''}
          helperText={inputError}
          style={{ marginLeft: '10px' }}
          onInput={(e) => {
            const inputValue = e.target.value;
            if (!/^\d*$/.test(inputValue)) {
              e.preventDefault();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={addNewDryer} style={{ marginRight: '10px' }}>
          Add
        </Button>
      </div>
      <div style={{ height: '400px', overflow: 'auto' }}>
      <TableContainer component={Paper} >
        <Paper style={{ width: "100%" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" className="table-header-bold">
                  Dryer No.
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Action
                </TableCell>
                <TableCell align="center" className="table-header-bold">
                  Timer
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
              {dryerData.map((dryer) => (
                <TableRow key={dryer.id}>
                  <TableCell align="center">{dryer.number}</TableCell>
                  <TableCell align="center">
                    {dryer.action === 'On' ? 'Running' : 'Off'}
                  </TableCell>
                  <TableCell align="center">{dryer.timer}</TableCell>
                  <TableCell align="center">{dryer.queue}</TableCell>
                  <TableCell align="center">{dryer.useCount}</TableCell>
                  <TableCell align="center">
                    {dryer.action === 'On' ? 'Under Maintenance' : 'Operational'}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Paper>
      </TableContainer>
      </div>
    </div>
  );
}

export default DryerTable;
