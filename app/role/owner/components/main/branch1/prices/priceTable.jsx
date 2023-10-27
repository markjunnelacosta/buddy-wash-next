import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function priceTable(

  supplyName,
  productPrice

) {
  return { supplyName, productPrice };
}

export default function editPrices() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow >
            <TableCell align="center" style={{ fontWeight: "bold" }}>Product</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Price </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>Action </TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
            {prices.length > 0 &&
              prices.map((prices) => (
                <TableRow
                  key={prices._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {prices.productName}
                  </TableCell>
                  <TableCell align="center">{prices.availableStock}</TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" id="edit-button">
                      Edit
                    </Button>
                    &nbsp;
                    <RemoveButton id={prices._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody> */}
      </Table>
    </TableContainer>
  );
}