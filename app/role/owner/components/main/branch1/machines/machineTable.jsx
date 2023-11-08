import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TableBody from "@mui/material/TableBody";

const getMachine = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/machine", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch machines");
    }

    const response = await res.json();
    return response.machineData;
  } catch (error) {
    console.log("Error loading machines: ", error);
  }
};

const MachineTable = () => {
  const [machineData, setMachineData] = useState([]);
  const [newMachine, setNewMachine] = useState({ number: '' });
  const [inputError, setInputError] = useState('');

  const [machineNumber, setMachineNumber] = useState("");
  const [useCount, setUseCount] = useState("");

  const onClickSave = async () => {
    console.log(machineNumber, useCount);
    try {
      const response = await fetch("http://localhost:3000/api/machine", {
        method: "POST",
        body: JSON.stringify({
          machineNumber: machineNumber,
          useCount: useCount,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        console.log("Machine data saved successfully.");
        fetchData(); // Refresh the data in the table
      } else {
        console.error("Failed to save machine data.");
      }
    } catch (error) {
      console.error("Error saving machine data: ", error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/machine", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch machine");
      }

      const response = await res.json();
      const machine = response.machineData || [];
      setMachineData(machine);
    } catch (error) {
      console.log("Error loading machine: ", error);
    }
  };

  useEffect(() => {
    const fetchMachine = async () => {
      try {
        const machineData = await getMachine();
        setMachineData(machineData);
      } catch (error) {
        console.error("Error fetching machine:", error);
      }
    };

    fetchMachine();
  }, []);

  useEffect(() => {
    console.log(machineData);
  }, [machineData]);



  return (
    <div>
      <div className="add-machine-form" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input type="text"
          // label="Washer Number"
          value={machineNumber}
          onChange={(e) => setMachineNumber(e.currentTarget.value)}
          // variant="outlined"
          id="machineNumberInput"
          style={{ marginLeft: '10px' }}
        // error={inputError !== ''}
        // helperText={inputError}
        // onInput={(e) => {
        //   const inputValue = e.target.value;
        //   if (!/^\d*$/.test(inputValue)) {
        //     e.preventDefault();
        //   }
        // }}
        />
        <Button variant="contained" color="primary" onClick={onClickSave} style={{ marginRight: '10px' }}>
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
              <TableBody>
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
              </TableBody>
            </Table>
          </Paper>
        </TableContainer>
      </div>
    </div>
  );
}

export default MachineTable;
