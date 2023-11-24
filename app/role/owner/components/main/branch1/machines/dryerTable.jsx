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
  const [newDryer, setNewDryer] = useState('');
  const [inputError, setInputError] = useState('');

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

        fetch('http://localhost:3000/api/dryer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newDryerObject),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Failed to add a new dryer');
            }
            return response.json();
          })
          .then((data) => {
            fetchData();
          })
          .catch((error) => {
            console.error('Error adding a new dryer:', error);
          });

        setDryerData((prevData) => [...prevData, newDryerObject]);
        setNewDryer('');
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
    return dryerData.some((dryer) => dryer.dryerNumber === parseInt(number));
  };

  const fetchData = () => {
    fetch('http://localhost:3000/api/dryer', {
      cache: 'no-store',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch dryer data');
        }
        return response.json();
      })
      .then((data) => {
        setDryerData(data.dryerData || []); // Update dryerData state
      })
      .catch((error) => {
        console.error('Error fetching dryer data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="add-dryer-form" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          label="Dryer Number"
          value={newDryer}
          onChange={(e) => setNewDryer(e.target.value)}
          variant="outlined"
          id="dryerNumberInput"
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
            maxLength: 2, // Maximum 2 digits
          }}
        />
        <Button variant="outlined" color="primary" onClick={addNewDryer} style={{ marginRight: '10px', color: 'blue', borderColor: 'blue' }}>
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
                  Dryer No.
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
              {dryerData
                .filter((dryer) => dryer.branchNumber === "1")
                .map((dryer, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{dryer.dryerNumber}</TableCell>
                    <TableCell align="center">
                      {dryer.action === 'Running' ? 'Running' : 'Off'}
                    </TableCell>
                    <TableCell align="center">{dryer.queue}</TableCell>
                    <TableCell align="center">{dryer.useCount}</TableCell>
                    <TableCell align="center">
                      {dryer.status === 'Operational' ? 'Operational' : 'Under Maintenance'}
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

export default DryerTable;
