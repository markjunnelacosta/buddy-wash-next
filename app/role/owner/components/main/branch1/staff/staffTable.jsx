import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function staffTable(

    staffName,
    staffAddress,
    staffContact,
    staffPosition

) {
    return { productNameName, productPrice };
}

export default function AddStaff() {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow >
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Name</TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Address </TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Phone Number </TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>Position </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
}