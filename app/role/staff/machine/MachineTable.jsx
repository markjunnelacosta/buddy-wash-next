import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import EditPopup from './EditButton';

function MachineTable() {
  const [machineData, setMachineData] = useState([]);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isEditMachinePopupVisible, setEditMachinePopupVisible] = useState(false);

  const fetchData = () => {
    fetch('http://localhost:3000/api/machine', {
      cache: 'no-store',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch machine data');
        }
        return response.json();
      })
      .then((data) => {
        setMachineData(data.machineData || []); // Update machineData state
      })
      .catch((error) => {
        console.error('Error fetching machine data:', error);
      });
  };

  const handleEditMachine = (machine) => {
    setSelectedMachine(machine);
    setEditMachinePopupVisible(true);
  };

  const handleCloseEditMachinePopup = () => {
    setEditMachinePopupVisible(false);
    fetchData(); // Refresh data after edit
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
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
                <TableCell align="center" className="table-header-bold">
                  Set-up
                </TableCell>
              </TableRow>
            </TableHead>
            <tbody>
              {machineData.map((machine, index) => (
                <TableRow key={index}>
                  <TableCell align="center">{machine.machineNumber}</TableCell>
                  <TableCell align="center">
                    {machine.action === 'Running' ? 'Running' : 'Off'}
                  </TableCell>
                  <TableCell align="center">{machine.timer}</TableCell>
                  <TableCell align="center">{machine.queue}</TableCell>
                  <TableCell align="center">{machine.useCount}</TableCell>
                  <TableCell align="center">
                    {machine.status === 'Operational' ? 'Operational' : 'Under Maintenance'}
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" onClick={() => handleEditMachine(machine)}>
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TableContainer>
      </div>
      <EditPopup
        isOpen={isEditMachinePopupVisible}
        item={selectedMachine}
        onClose={handleCloseEditMachinePopup}
        type="machine" // Specify the type for machines
      />
    </div>
  );
}

export default MachineTable;
