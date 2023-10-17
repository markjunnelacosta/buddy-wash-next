import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import "./Table.css";

function createData(
  date, 
  name,
  machineNo,
  machineAction,
  machinTimer,
  dryerNo,
  dryerAction,
  dryerTimer,
  status
) {
  return { date, name, machineNo, machineAction, machinTimer, dryerNo, dryerAction, dryerTimer, status };
}

// const rows=[];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell align="center" style={{fontWeight:"bold"}}>Date </TableCell>
            <TableCell align="center" style={{fontWeight:"bold"}}>Name</TableCell>
            <TableCell align="center" style={{fontWeight:"bold"}}>Machine No. </TableCell>
            <TableCell align="center" style={{fontWeight:"bold"}}>Action</TableCell>
            <TableCell align="center" style={{fontWeight:"bold"}}>Timer</TableCell>
            <TableCell align="center" style={{fontWeight:"bold"}}>Dryer No. </TableCell>
            <TableCell align="center" style={{fontWeight:"bold"}}>Action</TableCell>
            <TableCell align="center" style={{fontWeight:"bold"}}>Timer</TableCell>
            <TableCell align="center" style={{fontWeight:"bold"}}>Status</TableCell>

          </TableRow>
        </TableHead>
        {/* <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.date}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.machineNo}</TableCell>
              <TableCell align="right">{row.machineAction}</TableCell>
               <TableCell align="right">{row.machinTimer}</TableCell>
              <TableCell align="right">{row.dryerNo}</TableCell>
              <TableCell align="right">{row.dryerAction}</TableCell>
              <TableCell align="right">{row.dryerTimer}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody> */}
      </Table>
    </TableContainer>
  );
}