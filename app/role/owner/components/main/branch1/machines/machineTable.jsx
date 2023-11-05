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
  const [newMachine, setNewMachine] = useState({ number: '', minutes: 0 });

  const addNewMachine = () => {
    setMachineData((prevData) => {
      const newMachineData = [
        ...prevData,
        {
          id: prevData.length + 1, // Generate a unique ID
          status: 'Off',
          timer: '0:00',
          queue: 0,
          useCount: 0,
          number: newMachine.number,
        },
      ];

      return newMachineData;
    });

    // Reset the newMachine input fields
    setNewMachine({ number: '', minutes: 0 });
  };

  useEffect(() => {
    // You can load machine data from your database here or use an empty array initially
    // const initialMachineData = [
    //   { id: 1, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '1' },
    //   { id: 2, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '2' },
    //   { id: 3, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '3' },
    //   { id: 4, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '4' },
    //   { id: 5, status: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '5' }
    //   // Add more machines as needed
    // ];
    // setMachineData(initialMachineData);
  }, []);

  return (
    <div>
      <div className="add-machine-form">
        <TextField
          label="Machine Number"
          value={newMachine.number}
          onChange={(e) => setNewMachine({ ...newMachine, number: e.target.value })}
          variant="outlined"
          id="machineNumberInput"
        />
        <TextField
          label="Minutes"
          type="number"
          value={newMachine.minutes}
          onChange={(e) => setNewMachine({ ...newMachine, minutes: e.target.value })}
          variant="outlined"
          id="machineMinutesInput"
        />
        <Button variant="contained" color="primary" onClick={addNewMachine}>
          Add
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className="table-header">
                Machine No.
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
            {machineData.map((machine) => (
              <TableRow key={machine.id}>
                <TableCell align="center">{machine.number}</TableCell>
                <TableCell align="center">
                  {machine.status === 'On' ? 'Running' : 'Off'}
                </TableCell>
                <TableCell align="center">{machine.timer}</TableCell>
                <TableCell align="center">{machine.queue}</TableCell>
                <TableCell align="center">{machine.useCount}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default MachineTable;
