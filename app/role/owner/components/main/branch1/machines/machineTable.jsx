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
  const [newMachine, setNewMachine] = useState({ number: '' });
  const [inputError, setInputError] = useState('');

  const addNewMachine = () => {
    if (isValidInput(newMachine.number)) {
      if (!isNumberRepeated(newMachine.number)) {
        setMachineData((prevData) => {
          const newMachineData = [
            ...prevData,
            {
              id: prevData.length + 1,
              action: 'Off',
              timer: '0:00',
              queue: 0,
              useCount: 0,
              number: newMachine.number,
            },
          ];

          return newMachineData;
        });

        setNewMachine({ number: '' });
        setInputError('');
      } else {
        setInputError('The number already exists');
      }
    } else {
      setInputError('Please enter a valid integer between 1 and 25');
    }
  }

  const isValidInput = (input) => {
    const number = parseInt(input);
    return !isNaN(number) && number >= 1 && number <= 25;
  }

  const isNumberRepeated = (number) => {
    return machineData.some((machine) => machine.number === number);
  }

  useEffect(() => {
    const initialMachineData = [
      { id: 1, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '1' },
      { id: 2, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '2' },
      { id: 3, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '3' },
      { id: 4, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '4' },
      { id: 5, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '5' }
      // Add more machines as needed
    ];
    setMachineData(initialMachineData);
  }, []);

  return (
    <div>
      <div className="add-machine-form" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          label="Washer Number"
          value={newMachine.number}
          onChange={(e) => setNewMachine({ ...newMachine, number: e.target.value })}
          variant="outlined"
          id="machineNumberInput"
          style={{ marginLeft: '10px' }}
          error={inputError !== ''}
          helperText={inputError}
          onInput={(e) => {
            const inputValue = e.target.value;
            if (!/^\d*$/.test(inputValue)) {
              e.preventDefault();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={addNewMachine} style={{ marginRight: '10px' }}>
          Add
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Paper style={{ height: 450, width: "100%" }}>
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
              {machineData.map((machine) => (
                <TableRow key={machine.id}>
                  <TableCell align="center">{machine.number}</TableCell>
                  <TableCell align="center">
                    {machine.action === 'On' ? 'Running' : 'Off'}
                  </TableCell>
                  <TableCell align="center">{machine.timer}</TableCell>
                  <TableCell align="center">{machine.queue}</TableCell>
                  <TableCell align="center">{machine.useCount}</TableCell>
                  <TableCell align="center">
                    {machine.action === 'On' ? 'Under Maintenance' : 'Operational'}
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </Paper>
      </TableContainer>
    </div>
  );
}

export default MachineTable;
