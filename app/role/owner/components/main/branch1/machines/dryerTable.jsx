import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';

function DryerTable() {
  // Replace this with your actual dryer data
  const dryerData = [];

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="table-header">Dryer No.</TableCell>
            <TableCell align="center" className="table-header">Status</TableCell>
            <TableCell align="center" className="table-header">Timer</TableCell>
            <TableCell align="center" className="table-header">Queue</TableCell>
            <TableCell align="center" className="table-header">Use Count</TableCell>
          </TableRow>
        </TableHead>
        {/* Map over dryerData to display rows here */}
      </Table>
    </TableContainer>
  );
}

export default DryerTable;
