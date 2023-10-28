import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
// import "./CustomerTable.css";

// function Dryer(

//   dryerNo,
//   status,
//   timer,
//   queue,
//   useCount,

// ) {
//   return { dryerNo,status,timer,queue,useCount};
// }

// // const rows=[];

// export default function AddDryer() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow >
//             <TableCell align="center" style={{fontWeight:"bold"}}>Dryer No. </TableCell>
//             <TableCell align="center" style={{fontWeight:"bold"}}>Status</TableCell>
//             <TableCell align="center" style={{fontWeight:"bold"}}>Timer </TableCell>
//             <TableCell align="center" style={{fontWeight:"bold"}}>Queue</TableCell>
//             <TableCell align="center" style={{fontWeight:"bold"}}>Use Count </TableCell>

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

function DryerTable() {
  const [dryerData, setDryerData] = useState([]);

  useEffect(() => {
    // Simulate dryer data (replace with actual data from your database)
    const initialDryerData = [
      { id: 1, status: "Off", timer: 0, queue: 0, useCount: 0 },
      { id: 2, status: "Off", timer: 0, queue: 0, useCount: 0 },
      { id: 3, status: "Off", timer: 0, queue: 0, useCount: 0 },
      { id: 4, status: "Off", timer: 0, queue: 0, useCount: 0 },
      { id: 5, status: "Off", timer: 0, queue: 0, useCount: 0 },
      // Add more dryers as needed
    ];
    setDryerData(initialDryerData);
  }, []);

  const toggleTimer = (id) => {
    setDryerData((prevData) => {
      return prevData.map((dryer) => {
        if (dryer.id === id) {
          if (dryer.status === "Off") {
            startTimer(id); // Start the countdown timer
            return { ...dryer, status: "On" };
          } else {
            stopTimer(id); // Stop the timer
            return { ...dryer, status: "Off" };
          }
        }
        return dryer;
      });
    });
  };

  const startTimer = (id) => {
    setDryerData((prevData) => {
      return prevData.map((dryer) => {
        if (dryer.id === id) {
          const updatedDryer = { ...dryer, status: "On", queue: 0 };
          const startTime = Date.now();
          const endTime = startTime + 37 * 60 * 1000; // Set the timer to 37 minutes
          const updateTimer = () => {
            const currentTime = Date.now();
            if (updatedDryer.status === "On" && currentTime < endTime) {
              const remainingTime = new Date(endTime - currentTime);
              const timer = `${remainingTime.getMinutes()}:${remainingTime.getSeconds()}`;
              updatedDryer.timer = timer;
              setDryerData((prevData) =>
                prevData.map((m) => (m.id === id ? updatedDryer : m))
              );
              requestAnimationFrame(updateTimer);
            } else if (updatedDryer.status === "On" && currentTime >= endTime) {
              // The timer has ended, increment useCount
              updatedDryer.status = "Off";
              updatedDryer.useCount += 1;
              setDryerData((prevData) =>
                prevData.map((m) => (m.id === id ? updatedDryer : m))
              );
            }
          };
          updateTimer();
          return updatedDryer;
        }
        return dryer;
      });
    });
  };

  const stopTimer = (id) => {
    setDryerData((prevData) => {
      return prevData.map((dryer) => {
        if (dryer.id === id && dryer.status === "On") {
          const updatedDryer = { ...dryer, status: "Off" };
          setDryerData((prevData) =>
            prevData.map((m) => (m.id === id ? updatedDryer : m))
          );
        }
        return dryer;
      });
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="table-header">
              Dryer No.
            </TableCell>
            <TableCell align="center" className="table-header">
              Status
            </TableCell>
            <TableCell align="center" className="table-header">
              Timer
            </TableCell>
            <TableCell align="center" className="table-header">
              Queue
            </TableCell>
            <TableCell align="center" className="table-header">
              Use Count
            </TableCell>
          </TableRow>
        </TableHead>
        <tbody>
          {dryerData.map((dryer) => (
            <TableRow key={dryer.id}>
              <TableCell align="center">{dryer.id}</TableCell>
              <TableCell align="center">
                {dryer.status === "On" ? "Running" : "Off"}
                <Button
                  variant="contained"
                  onClick={() => toggleTimer(dryer.id)}
                  style={{ borderRadius: "50%" }}
                >
                  {dryer.status === "On" ? "Stop" : "Start"}
                </Button>
              </TableCell>
              <TableCell align="center">{dryer.timer}</TableCell>
              <TableCell align="center">{dryer.queue}</TableCell>
              <TableCell align="center">{dryer.useCount}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default DryerTable;

// import React from 'react';
// import TableContainer from '@mui/material/TableContainer';
// import Table from '@mui/material/Table';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TableCell from '@mui/material/TableCell';
// import Paper from '@mui/material/Paper';

// function DryerTable() {
//   // Replace this with your actual dryer data
//   const dryerData = [];

//   return (
//     <TableContainer component={Paper}>
//       <Table size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center" className="table-header">Dryer No.</TableCell>
//             <TableCell align="center" className="table-header">Status</TableCell>
//             <TableCell align="center" className="table-header">Timer</TableCell>
//             <TableCell align="center" className="table-header">Queue</TableCell>
//             <TableCell align="center" className="table-header">Use Count</TableCell>
//           </TableRow>
//         </TableHead>
//         {/* Map over dryerData to display rows here */}
//       </Table>
//     </TableContainer>
//   );
// }

// export default DryerTable;
