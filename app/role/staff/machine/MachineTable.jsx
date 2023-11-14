import React, { useState, useEffect } from "react";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
// import "./CustomerTable.css";

// function Machine(

//   machineNo,
//   status,
//   timer,
//   queue,
//   useCount,

// ) {
//   return { machineNo,status,timer,queue,useCount};
// }

// // const rows=[];
// export default function AddMachine() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow >
//             <TableCell align="center" style={{fontWeight:"bold"}}>Machine No. </TableCell>
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

function MachineTable() {
  const [machineData, setMachineData] = useState([]);

  useEffect(() => {
    // Simulate machine data (replace with actual data from your database)
    const initialMachineData = [
      { id: 1, status: "Off", timer: 0, queue: 0, useCount: 0 },
      { id: 2, status: "Off", timer: 0, queue: 0, useCount: 0 },
      { id: 3, status: "Off", timer: 0, queue: 0, useCount: 0 },
      { id: 4, status: "Off", timer: 0, queue: 0, useCount: 0 },
      { id: 5, status: "Off", timer: 0, queue: 0, useCount: 0 },
      // Add more machines as needed
    ];
    setMachineData(initialMachineData);
  }, []);

  const toggleTimer = (id) => {
    setMachineData((prevData) => {
      return prevData.map((machine) => {
        if (machine.id === id) {
          if (machine.status === "Off") {
            startTimer(id); // Start the countdown timer
            return { ...machine, status: "On" };
          } else {
            stopTimer(id); // Stop the timer
            return { ...machine, status: "Off" };
          }
        }
        return machine;
      });
    });
  };
  const startTimer = (id) => {
    setMachineData((prevData) => {
      return prevData.map((machine) => {
        if (machine.id === id) {
          const updatedMachine = { ...machine, status: "On", queue: 0 };
          const startTime = Date.now();
          const endTime = startTime + 37 * 60 * 1000; // Set the timer to 37 minutes
          const updateTimer = () => {
            const currentTime = Date.now();
            if (updatedMachine.status === "On" && currentTime < endTime) {
              const remainingTime = new Date(endTime - currentTime);
              const timer = `${remainingTime.getMinutes()}:${remainingTime.getSeconds()}`;
              updatedMachine.timer = timer;
              setMachineData((prevData) =>
                prevData.map((m) => (m.id === id ? updatedMachine : m))
              );
              requestAnimationFrame(updateTimer);
            } else if (
              updatedMachine.status === "On" &&
              currentTime >= endTime
            ) {
              // The timer has ended, increment useCount
              updatedMachine.status = "Off";
              updatedMachine.useCount += 1;
              setMachineData((prevData) =>
                prevData.map((m) => (m.id === id ? updatedMachine : m))
              );
            }
          };
          updateTimer();
          return updatedMachine;
        }
        return machine;
      });
    });
  };
  const stopTimer = (id) => {
    setMachineData((prevData) => {
      return prevData.map((machine) => {
        if (machine.id === id && machine.status === "On") {
          const updatedMachine = { ...machine, status: "Off" };
          setMachineData((prevData) =>
            prevData.map((m) => (m.id === id ? updatedMachine : m))
          );
        }
        return machine;
      });
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" className="table-header">
              Machine No.
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
          {machineData.map((machine) => (
            <TableRow key={machine.id}>
              <TableCell align="center">{machine.id}</TableCell>
              <TableCell align="center">
                {machine.status === "On" ? "Running" : "Off"}
                <Button
                  variant="contained"
                  onClick={() => toggleTimer(machine.id)}
                  style={{ borderRadius: "50%" }}
                >
                  {machine.status === "On" ? "Stop" : "Start"}
                </Button>
              </TableCell>
              <TableCell align="center">{machine.timer}</TableCell>
              <TableCell align="center">{machine.queue}</TableCell>
              <TableCell align="center">{machine.useCount}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}
export default MachineTable;
