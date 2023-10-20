"use client";

// import * as React from 'react';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// function SupplyInOutTable(
//   date,
//   supplyName,
//   quantity,
//   type,
//   action

// ) {
//   return { date, supplyName, quantity, type, action};
// }

// // const rows=[];

// export default function AddSupplyInOut() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow >
//             <TableCell align="center" style={{fontWeight:"bold"}}>Date </TableCell>
//             <TableCell align="center" style={{fontWeight:"bold"}}>Supply Name</TableCell>
//             <TableCell align="center" style={{fontWeight:"bold"}}>Quantity </TableCell>
//             <TableCell align="center" style={{fontWeight:"bold"}}>Type</TableCell>
//             <TableCell align="center" style={{fontWeight:"bold"}}>Action </TableCell>

//           </TableRow>
//         </TableHead>
//         {/* <TableBody>
//           {rows.map((row) => (
//             <TableRow
//               key={row.name}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.date}</TableCell>
//               <TableCell align="right">{row.name}</TableCell>
//               <TableCell align="right">{row.machineNo}</TableCell>
//               <TableCell align="right">{row.machineAction}</TableCell>
//                <TableCell align="right">{row.machinTimer}</TableCell>
//               <TableCell align="right">{row.dryerNo}</TableCell>
//               <TableCell align="right">{row.dryerAction}</TableCell>
//               <TableCell align="right">{row.dryerTimer}</TableCell>
//               <TableCell align="right">{row.status}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody> */}
//       </Table>
//     </TableContainer>
//   );
// }

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./SupplyInOutTable.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import RemoveButton from "./RemoveButton";

const getSupplies = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/supply", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supplies");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.supplies;
  } catch (error) {
    console.log("Error loading customers: ", error);
  }
};

const SupplyInOutTable = () => {
  const [supplies, setSupplies] = React.useState([]);

  React.useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const suppliesData = await getSupplies();
        setSupplies(suppliesData);
      } catch (error) {
        console.error("Error fetching supplies:", error);
      }
    };

    fetchSupplies();
  }, []);

  React.useEffect(() => {
    console.log(supplies);
  }, [supplies]);

  return (
    <TableContainer component={Paper}>
      <Paper style={{ height: 550, width: "100%" }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          sx={{ minWidth: 650 }}
          size="small"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Quantity
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Type
              </TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          {/* <TableBody>
            {supplies.length > 0 &&
              supplies.map((supply) => (
                <TableRow
                  key={supply._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center" component="th" scope="row">
                    {supply.supplyName}
                  </TableCell>
                  <TableCell align="center">{supply.availableStock}</TableCell>
                  <TableCell align="center"> </TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" id="edit-button">
                      Rename
                    </Button>
                    &nbsp;
                    <RemoveButton id={supply._id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody> */}
        </Table>
      </Paper>
    </TableContainer>
  );
};

export default SupplyInOutTable;
