import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function transactionsTable(

  date,
  customerName,
  totalAmount

) {
  return { date, customerName, totalAmount };
}

export default function AddTransactions() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell align="center" style={{ fontWeight: "bold" }}>Date </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Customer Name</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Total Amount </TableCell>
          </TableRow>
        </TableHead>
      </Table>
    </TableContainer>
  );
}