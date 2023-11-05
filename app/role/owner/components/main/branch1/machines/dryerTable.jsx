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
  const [newDryer, setNewDryer] = useState({ number: '', minutes: 0 });

  const addNewDryer = () => {
    setDryerData((prevData) => {
      const newDryerData = [
        ...prevData,
        {
          id: prevData.length + 1, // Generate a unique ID
          status: 'Off',
          timer: '0:00',
          queue: 0,
          useCount: 0,
          number: newDryer.number,
        },
      ];

      return newDryerData;
    });

    // Reset the newDryer input fields
    setNewDryer({ number: '', minutes: 0 });
  };

  useEffect(() => {
    // You can load dryer data from your database here or use an empty array initially
    // const initialDryerData = [
    //   { id: 1, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '1' },
    //   { id: 2, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '2' },
    //   { id: 3, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '3' },
    //   { id: 4, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '4' },
    //   { id: 5, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '5' }
    //   // Add more dryers as needed
    // ];
    // setDryerData(initialDryerData);
  }, []);

  return (
    <div>
      <div className="add-dryer-form">
        <TextField
          label="Dryer Number"
          value={newDryer.number}
          onChange={(e) => setNewDryer({ ...newDryer, number: e.target.value })}
          variant="outlined"
          id="dryerNumberInput"
        />
        <TextField
          label="Minutes"
          type="number"
          value={newDryer.minutes}
          onChange={(e) => setNewDryer({ ...newDryer, minutes: e.target.value })}
          variant="outlined"
          id="dryerMinutesInput"
        />
        <Button variant="contained" color="primary" onClick={addNewDryer}>
          Add
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="table-header">
                Dryer No.
              </TableCell>
              <TableCell align="center" className="table-header">
                Status
              </TableCell>
              <TableCell align="center" className="table-header">
                Timer
              </TableCell>
              <TableCell align="center" className="table-header">
                Queue
              </TableCell>
              <TableCell align="center" className="table-header">
                Use Count
              </TableCell>
            </TableRow>
          </TableHead>
          <tbody>
            {dryerData.map((dryer) => (
              <TableRow key={dryer.id}>
                <TableCell align="center">{dryer.number}</TableCell>
                <TableCell align="center">
                  {dryer.status === 'On' ? 'Running' : 'Off'}
                </TableCell>
                <TableCell align="center">{dryer.timer}</TableCell>
                <TableCell align="center">{dryer.queue}</TableCell>
                <TableCell align="center">{dryer.useCount}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DryerTable;
