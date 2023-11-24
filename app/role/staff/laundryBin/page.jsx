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
        console.log(data.machineData.filter((m) => m.branchNumber == 1));
        setMachineData(data.machineData || []); // Update machineData state
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error);
      });
  };

  useEffect(() => {
    fetchMachines();
  }, []);

  const openAddLaundry = () => {
    setShowAddLaundry(true);
  };

  const closeAddLaundry = () => {
    setShowAddLaundry(false);
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const order = await getOrderDetails();
        setLaundryData(order);
        const timers = [];
        order.forEach((o) => {
          timers.push({ orderId: o._id, startTime: parseInt(o.machineTimer) });
        });
        console.log("timers", timers);
        setMachineTimer(timers);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchOrder();
  }, []);

  useEffect(() => {
    // console.log(laundryData);
  }, [laundryData]);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/laundrybin", {
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
  };

  const computedDate = (start) => {
    const startdate = new Date(start);
    if (startdate) {
      const endDate = startdate;
      endDate.setMinutes(startdate.getMinutes() + 1);

      const currDate = new Date();

      console.log(startdate.toLocaleTimeString(), "Start");
      console.log(endDate.toLocaleTimeString(), "End");
      console.log(currDate.toLocaleTimeString(), "Current Time");
      console.log(endDate.toLocaleTimeString(), "Remaining");
      console.log("remaining", endDate.getTime() - currDate.getTime());
      return endDate.getTime() - currDate.getTime();
    }

    return 0;
  };

  const updateOrderTimer = async (orderId, date) => {
    // /************DITO ILALAGAY ANG PAG PATCH NG TIMER SA DB
    const res = await fetch(`http://localhost:3000/api/order?id=${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ machineTimer: date }),
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

  useEffect(() => {
    console.log(machineTimer);
  }, [machineTimer]);

  const onToggleChange = async (orderId) => {
    const timers = [...machineTimer];
    const index = machineTimer.findIndex((m) => m.orderId == orderId);
    const currentTime = Date.now();
    timers[index].startTime = currentTime;

    setMachineTimer(timers);

    updateOrderTimer(orderId, currentTime);
  };

  const getOrderStartTime = (orderId) => {
    const index = machineTimer.findIndex((m) => m.orderId == orderId);
    return machineTimer[index].startTime;
  };

  const getCountDownTimer = (orderId) => {
    const startTime = getOrderStartTime(orderId);

    const renderer = ({ hours, minutes, seconds, completed, api, props }) => {
      if (completed) {
        //Render a complete state
        console.log("Completed.");
        const timers = [...machineTimer];
        const index = timers.findIndex((m) => m.orderId == orderId);
        updateOrderTimer(orderId, 0);
        // update machine timer to 0
        // update useCount plus 1
        timers[index].startTime = 0;
        setMachineTimer(timers);
      } else {
        //Render a countdown
        return (
          <span>
            {minutes}:{seconds}
          </span>
        );
      }
    };

    if (startTime) {
      return (
        <Countdown
          date={Date.now() + computedDate(getOrderStartTime(orderId))}
          renderer={renderer}
        />
      );
    }
  };

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
                  {laundryData.map((order) => (
                    <TableRow
                      key={order._id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell className="">
                        {new Date(order.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="">{order.name}</TableCell>
                      <TableCell className="">{order.machineNo}</TableCell>
                      <TableCell className="">
                        <MachineToggle
                          isChecked={
                            computedDate(getOrderStartTime(order._id)) > 0 ||
                            false
                          }
                          onToggle={() => onToggleChange(order._id)}
                        />
                      </TableCell>
                      <TableCell className="">
                        {getCountDownTimer(order._id)}
                      </TableCell>
                      <TableCell className="">t</TableCell>
                      <TableCell className="">
                        <DryerToggle
                          disabled={
                            computedDate(getOrderStartTime(order._id)) > 0 ||
                            false
                          }
                        />
                      </TableCell>
                      <TableCell className="">00:00</TableCell>
                      <TableCell className="">t</TableCell>
                    </TableRow>
                  ))}
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
