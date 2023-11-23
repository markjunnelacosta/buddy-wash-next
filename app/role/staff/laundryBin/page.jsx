"use client";

import React from "react";
import "./LaundryBin.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Add, Timer } from "@mui/icons-material";
import { useState, useEffect } from "react";
import AddLaundry from "../../components/forms/addLaundry/page";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MachineToggle from "./machineToggle";
import DryerToggle from "./dryerToggle";
import Countdown from "react-countdown";
import { toggle } from "@nextui-org/react";

// const getOrder = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/laundrybin", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch order");
//     }

//     const response = await res.json();
//     return response.laundryData || [];
//   } catch (error) {
//     console.log("Error loading order: ", error);
//   }
// };

// get the order details of customer (date, name, machine #,timer,  dryer#, etc.)
//need yung machine number doon sa order para alam kung ano yung machine number
//na gagamitan ng PATCH sa machine table

const getOrderDetails = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/order", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.orders;
  } catch (error) {
    console.log("Error loading orders: ", error);
  }
};

const LaundryBin = () => {
  const [laundryData, setLaundryData] = useState([]);
  const [showAddLaundry, setShowAddLaundry] = useState(false);
  const [machineTimer, setMachineTimer] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);

  const fetchMachines = () => {
    fetch("http://localhost:3000/api/machine", {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch machine data");
        }
        return response.json();
      })
      .then((data) => {
        setMachineData(data.machineData || []); // Update machineData state
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error);
      });
  };

  useEffect(() => {
    console.log("machine timer" + machineTimer);
  }, [machineTimer]);

  React.useEffect(() => {
    console.log(orderDetails);
  }, [orderDetails]);

  const openAddLaundry = () => {
    setShowAddLaundry(true);
  };

  const closeAddLaundry = () => {
    setShowAddLaundry(false);
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  console.log(machineData);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const order = await getOrderDetails();
        setOrderDetails(order);
        const timers = [];
        order.forEach((o) => {
          timers.push({ orderId: o._id, startTime: 0 }); //************DITO ILALAGAY ANG START TIME NA GALING SA DB
        });
        console.log("timers", timers);
        setMachineTimer(timers);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchOrderDetails();
  }, []);

  // useEffect(() => {
  //   const fetchOrder = async () => {
  //     try {
  //       const order = await getOrder();
  //       setLaundryData(order);
  //       const timers = [];
  //       order.forEach((o) => {
  //         timers.push({ orderId: o._id, startTime: 1700587291628 }); //************DITO ILALAGAY ANG START TIME NA GALING SA DB
  //       });
  //       console.log("timers", timers);
  //       setMachineTimer(timers);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  //   fetchOrder();
  // }, []);

  // useEffect(() => {
  //   // console.log(laundryData);
  // }, [laundryData]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/order", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch order");
      }

      // create reference for order_id with timer
      const response = await res.json();
      const order = response.laundryData || [];
      setLaundryData(order);
    } catch (error) {
      console.log("Error loading orders: ", error);
    }
  };

  const handleSaveData = () => {
    closeAddLaundry();
    fetchData();
    window.location.reload();
  };

  const computedDate = (start) => {
    const startdate = new Date(start);
    if (startdate) {
      const endDate = new Date(start);
      endDate.setMinutes(startdate.getMinutes() + 5); // + kung gaano katagal yung type of wash dapat

      const currDate = new Date();

      console.log(startdate.toLocaleTimeString(), "Start");
      console.log(endDate.toLocaleTimeString(), "End");
      console.log(currDate.toLocaleTimeString(), "Current Time");
      console.log(endDate.toLocaleTimeString(), "Remaining");
      return endDate.getTime() - currDate.getTime();
    }

    return 0;
  };

  // const renderer = async ({ hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     //Render a complete state
  //     //************DITO IOOFF ANG TOGGLE
  //     //************DITO RIN ANG PAG PATCH NG USE COUNT SA MACHINE TABLE
  //     <span>Done</span>;
  //     const res = await fetch(`http://localhost:3000/api/order?id=${orderId}`, {
  //       method: "PATCH",
  //       body: JSON.stringify({ machineTimer: 0 }),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     if (res.ok) {
  //       console.log("Supply record updated successfully");
  //     } else {
  //       console.error("Failed to update supply record");
  //     }
  //   } else {
  //     //Render a countdown
  //     return (
  //       <span>
  //         {minutes}:{seconds}
  //       </span>
  //     );
  //   }
  // };

  const renderer = async ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      //************DITO IOOFF ANG TOGGLE
      //************DITO RIN ANG PAG PATCH NG USE COUNT SA MACHINE TABLE
      onToggleChange(orderId, false); // Pass false to turn off the toggle

      return <span>Done</span>;
    } else {
      // Render a countdown
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  useEffect(() => {
    console.log(machineTimer);
  }, [machineTimer]);

  // const onToggleChange = async (orderId) => {
  //   const timers = [...machineTimer];
  //   const index = machineTimer.findIndex((m) => m.orderId == orderId);
  //   timers[index].startTime = Date.now();

  //   setMachineTimer(timers);

  //   //************DITO ILALAGAY ANG PAG PATCH NG TIMER SA DB

  //   const res = await fetch(`http://localhost:3000/api/order?id=${orderId}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({ machineTimer: Date.now() },{} ),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (res.ok) {
  //     console.log("Orders record updated successfully");
  //   } else {
  //     console.error("Failed to update orders record");
  //   }
  // };
  // const onToggleChange = async (orderId) => {
  //   const timers = [...machineTimer];
  //   const index = machineTimer.findIndex((m) => m.orderId === orderId);
  //   timers[index].startTime = Date.now();

  //   setMachineTimer(timers);

  //   //************DITO ILALAGAY ANG PAG PATCH NG TIMER SA DB

  //   const res = await fetch(`http://localhost:3000/api/order?id=${orderId}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({ machineTimer: Date.now() }, {}),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (res.ok) {
  //     console.log("Orders record updated successfully");
  //   } else {
  //     console.error("Failed to update orders record");
  //   }
  // };
  // const selectedMachine = machineData.find(
  //   (machine) => machine.machineNumber === fabCon
  // );

  const onToggleChange = async (orderId, shouldTurnOn) => {
    const timers = [...machineTimer];
    const index = machineTimer.findIndex((m) => m.orderId === orderId);

    // Update the startTime based on shouldTurnOn
    timers[index].startTime = shouldTurnOn ? Date.now() : 0;

    setMachineTimer(timers);

    //************DITO ILALAGAY ANG PAG PATCH NG TIMER SA DB
    const res = await fetch(`http://localhost:3000/api/order?id=${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ machineTimer: shouldTurnOn ? Date.now() : 0 }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Orders record updated successfully");
    } else {
      console.error("Failed to update orders record");
    }

    console.log("Start Time:", getOrderStartTime(orderId));
  };

  const getOrderStartTime = (orderId) => {
    const index = machineTimer.findIndex((m) => m.orderId == orderId);
    return machineTimer[index].startTime;
  };

  //ERROR: HINDI NAGCOCOUNTDOWN
  //HINDI NAKUKUHA ANG START TIME

  const getCountDownTimer = (orderId) => {
    const startTime = getOrderStartTime(orderId);
    if (startTime) {
      return (
        <Countdown
          date={Date.now() + computedDate(getOrderStartTime(orderId))}
          renderer={renderer}
        />
      );
    }
  };

  // const onToggleChange = (orderId) => {
  //   const timers = [...machineTimer];
  //   const index = machineTimer.findIndex((m) => m.orderId == orderId);
  //   timers[index].startTime = Date.now();

  //   setMachineTimer(timers);

  // const res = await fetch(`http://localhost:3000/api/supply?id=${supplyId}`, {
  //   method: "PATCH",
  //   body: JSON.stringify({ availableStock: stock }),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  // if (res.ok) {
  //   console.log("Supply record updated successfully");
  // } else {
  //   console.error("Failed to update supply record");
  // }

  // window.location.reload();

  // NEED GAWIN:
  //   -kailangan ng table na pagsstore-an ng combination ng laundryBin at machine
  //   -gumawa ng function na automatic mag aassign ng machine number
  //   -yung machine na maaassign sa bawat order, yun yung mapapatch na startTime at useCount
  //   -pag tapos na yung time, mag aad ng 1 sa useCount
  //   -pag tapos na yung time, magooff yung toggle
  //   -pag tapos na yung time, marereset sa 0 yung time sa database

  //   example of PATCH
  //   const res = await fetch(`http://localhost:3000/api/machine?id=${supplyId}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({ availableStock: stock }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });

  //   if (res.ok) {
  //     console.log("Supply record updated successfully");
  //   } else {
  //     console.error("Failed to update supply record");
  //   }

  //   window.location.reload();
  // };

  return (
    <>
      <div className="laundryBin-container">
        <div className="blue-container">
          <Button
            style={{
              backgroundColor: "white",
              color: "black",
              width: "200px",
              height: "50px",
              margin: "0",
              fontWeight: "bold",
              alignSelf: "flex-end",
              margin: "30px",
              borderRadius: "10px",
            }}
            variant="contained"
            startIcon={<Add />}
            onClick={openAddLaundry}
          >
            New Laundry
          </Button>
          <div className="table-container">
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell className="table-header">Date </TableCell>
                    <TableCell className="table-header">Name</TableCell>
                    <TableCell className="table-header">Machine No. </TableCell>
                    <TableCell className="table-header">Action</TableCell>
                    <TableCell className="table-header">Timer</TableCell>
                    <TableCell className="table-header">Dryer No. </TableCell>
                    <TableCell className="table-header">Action</TableCell>
                    <TableCell className="table-header">Timer</TableCell>
                    <TableCell className="table-header">Status</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {orderDetails.map((order) => {
                    const timer = machineTimer.find(
                      (t) => t.orderId === order._id
                    );

                    return (
                      <TableRow
                        key={order._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="">
                          {new Date(order.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="table-body">
                          {order.name}
                        </TableCell>
                        <TableCell className="table-body">
                          {order.machineNo}
                        </TableCell>
                        <TableCell className="table-body">
                          {/* <MachineToggle
                          onToggle={() => onToggleChange(order._id)}
                        /> */}

                          <MachineToggle
                            key={timer.orderId}
                            orderId={timer.orderId}
                            onToggle={onToggleChange}
                          />
                        </TableCell>
                        <TableCell className="table-body">
                          {getCountDownTimer(order._id)}
                        </TableCell>
                        <TableCell className="table-body">
                          {order.dryerNo}
                        </TableCell>
                        <TableCell className="table-body">
                          <DryerToggle />
                        </TableCell>
                        <TableCell className="table-body"></TableCell>
                        <TableCell className="table-body">t</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

      <AddLaundry
        isOpen={showAddLaundry}
        onClose={closeAddLaundry}
        onSaveData={handleSaveData}
      />
    </>
  );
};
export default LaundryBin;
