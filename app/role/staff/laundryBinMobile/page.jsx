"use client";

import React from "react";
import "./LaundryBin.css";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Add, Timer } from "@mui/icons-material";
import { useState, useEffect } from "react";
import Details from "./viewDetails";
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
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const getOrderDetails = async () => {
  try {
    const res = await fetch("/api/order-mobile", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch orders");
    }

    const response = await res.json();
    return response.mobileOrders;
  } catch (error) {
    console.log("Error loading orders: ", error);
  }
};

const LaundryBin = () => {
  const [mobileOrders, setMobileOrders] = useState([]);
  const [machineTimer, setMachineTimer] = useState([]);
  const [machineData, setMachineData] = useState([]);
  const [dryerData, setDryerData] = useState([]);
  const [laundryOrderSummary, setLaundryOrderSummary] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const totalPages = Math.ceil(mobileOrders.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, mobileOrders.length);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const fetchMachines = () => {
    fetch("/api/machine", {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch machine data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(
          data.machineData.filter(
            (m) => m.branchNumber == 1 || m.branchNumber == "1"
          )
        );
        setMachineData(data.machineData || []); // Update machineData state
      })
      .catch((error) => {
        console.error("Error fetching machine data:", error);
      });
  };

  useEffect(() => {
    fetchMachines();
  }, []);
  console.log("********machine data", machineData);
  const fetchDryer = () => {
    fetch("/api/dryer", {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dryer data");
        }
        return response.json();
      })
      .then((data) => {
        console.log(
          data.dryerData.filter(
            (d) => d.branchNumber == 1 || d.branchNumber == "1"
          )
        );
        setDryerData(data.dryerData || []); // Update dryer state
      })
      .catch((error) => {
        console.error("Error fetching dryer data:", error);
      });
  };

  useEffect(() => {
    fetchDryer();
  }, []);
  console.log("********dryer data", dryerData);

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
        console.log("*****orderDetails   ", order);
        setMobileOrders(order);
        const timers = [];
        order.forEach((o) => {
          timers.push({
            orderId: o._id,
            machineNumber: o.machineNo,
            startTime: parseInt(o.machineTimer),
            dryerNumber: o.dryerNo,
            dryerStartTime: parseInt(o.dryerTimer),
          });
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
  }, [mobileOrders]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/laundrybin", {
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
    const res = await fetch(`/api/order?id=${orderId}`, {
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

    // console.log("Start Time:", getOrderStartTime(orderId));
  };

  const updateOrderTimerForDryer = async (orderId, date) => {
    // /************DITO ILALAGAY ANG PAG PATCH NG TIMER SA DB
    const res = await fetch(`/api/order?id=${orderId}`, {
      method: "PATCH",
      body: JSON.stringify({ dryerTimer: date }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Orders record updated successfully");
    } else {
      console.error("Failed to update orders record");
    }

    // console.log("Start Time:", getOrderStartTime(orderId));
  };

  useEffect(() => {
    console.log(machineTimer);
  }, [machineTimer]);

  const updateMachineTimer = async (selectedMachine, date) => {
    // /************DITO ILALAGAY ANG PAG PATCH NG TIMER SA DB
    const res = await fetch(`/api/machine?id=${selectedMachine}`, {
      method: "PATCH",
      body: JSON.stringify({ timer: date }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Machine timer updated successfully");
    } else {
      console.error("Failed to update Machine timer ");
    }

    // console.log("Start Time:", getOrderStartTime(selectedMachine));
  };
  const updateMachineLastUsedTime = async (selectedMachine, date) => {
    const res = await fetch(`/api/machine?id=${selectedMachine}`, {
      method: "PATCH",
      body: JSON.stringify({ lastUsed: date }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Machine timer updated successfully");
    } else {
      console.error("Failed to update Machine timer ");
    }

    // console.log("Start Time:", getOrderStartTime(selectedMachine));
  };

  const updateDryerTimer = async (selectedDryer, date) => {
    // /************DITO ILALAGAY ANG PAG PATCH NG TIMER SA DB
    const res = await fetch(`/api/dryer?id=${selectedDryer}`, {
      method: "PATCH",
      body: JSON.stringify({ timer: date }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Dryer timer updated successfully");
    } else {
      console.error("Failed to update Dryer timer ");
    }

    // console.log("Start Time:", getOrderStartTime(selectedMachine));
  };

  const updateDryerLastUsedTime = async (selectedDryer, date) => {
    // /************DITO ILALAGAY ANG PAG PATCH NG TIMER SA DB
    const res = await fetch(`/api/dryer?id=${selectedDryer}`, {
      method: "PATCH",
      body: JSON.stringify({ lastUsed: date }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      console.log("Dryer timer updated successfully");
    } else {
      console.error("Failed to update Dryer timer ");
    }

    // console.log("Start Time:", getOrderStartTime(selectedMachine));
  };

  const onToggleChange = async (orderId) => {
    const timers = [...machineTimer];
    const index = machineTimer.findIndex((m) => m.orderId == orderId);
    const currentTime = Date.now();
    timers[index].startTime = currentTime;

    setMachineTimer(timers);

    updateOrderTimer(orderId, currentTime);

    const mData = [...machineData];
    const mIndex = machineData.findIndex(
      (m) => parseInt(m.machineNumber) == timers[index].machineNumber
    );
    const selectedMachine = mData[mIndex]._id;
    console.log("****mdata", mData);
    console.log("*****mIndex", mIndex);
    console.log("*****selectedMachine", selectedMachine);
    updateMachineTimer(selectedMachine, timers[index].startTime);
    updateMachineLastUsedTime(selectedMachine, timers[index].startTime);
  };

  const onDryerToggleChange = async (orderId) => {
    const timers = [...machineTimer];
    const index = machineTimer.findIndex((m) => m.orderId == orderId);
    const currentTime = Date.now();
    timers[index].dryerStartTime = currentTime;

    setMachineTimer(timers);

    updateOrderTimerForDryer(orderId, currentTime);

    const dData = [...dryerData];
    const dIndex = dryerData.findIndex(
      (d) => parseInt(d.dryerNumber) == timers[index].dryerNumber
    );
    const selectedDryer = dData[dIndex]._id;
    updateDryerTimer(selectedDryer, timers[index].dryerStartTime);
    updateDryerLastUsedTime(selectedDryer, timers[index].dryerStartTime);
  };

  const getOrderStartTime = (orderId) => {
    const index = machineTimer.findIndex((m) => m.orderId == orderId);
    return machineTimer[index].startTime;
  };

  const getOrderStartTimeDryer = (orderId) => {
    const index = machineTimer.findIndex((m) => m.orderId == orderId);
    return machineTimer[index].dryerStartTime;
  };
  const updateUseCountMachine = async (selectedMachine, useCount) => {
    const res = await fetch(`/api/machine?id=${selectedMachine}`, {
      method: "PATCH",
      body: JSON.stringify({ useCount: useCount + 1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
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
        const mData = [...machineData];
        const mIndex = machineData.findIndex(
          (m) => parseInt(m.machineNumber) == timers[index].machineNumber
        );
        const selectedMachine = mData[mIndex]._id;
        updateMachineTimer(selectedMachine, 0);
        // update machine timer to 0

        timers[index].startTime = 0;
        setMachineTimer(timers);
        // add 1 to use count
        updateUseCountMachine(selectedMachine, mData[mIndex].useCount);
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
  const deleteOrder = async (orderId) => {
    const res = await fetch(`/api/order?id=${orderId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log("Order deleted");
    }
    window.location.reload();
  };
  const updateUseCountDryer = async (selectedDryer, useCount) => {
    const res = await fetch(`/api/dryer?id=${selectedDryer}`, {
      method: "PATCH",
      body: JSON.stringify({ useCount: useCount + 1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  const getCountDownTimerDryer = (orderId) => {
    const startTime = getOrderStartTimeDryer(orderId);

    const renderer = ({ hours, minutes, seconds, completed, api, props }) => {
      if (completed) {
        //Render a complete state
        console.log("Completed.");
        const timers = [...machineTimer];
        const index = timers.findIndex((m) => m.orderId == orderId);
        updateOrderTimerForDryer(orderId, 0);
        const dData = [...dryerData];
        const dIndex = dryerData.findIndex(
          (d) => parseInt(d.dryerNumber) == timers[index].dryerNumber
        );
        const selectedDryer = dData[dIndex]._id;
        updateDryerTimer(selectedDryer, 0);
        // update dryer timer to 0

        // Increment useCount on the server
        // fetch(`/api/dryer/${selectedDryer}`, {
        //   method: "PATCH",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ timer: 0 }),
        // })
        //   .then((res) => res.json())
        //   .then((data) => {
        //     console.log(data.message);
        //   })
        //   .catch((error) => {
        //     console.error("Failed to increment useCount:", error);
        //   });

        // update useCount plus 1
        timers[index].dryerStartTime = 0;
        setMachineTimer(timers);
        // delete order
        deleteOrder(orderId);
        // update use count
        updateUseCountDryer(selectedDryer, dData[dIndex].useCount);
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
          date={Date.now() + computedDate(getOrderStartTimeDryer(orderId))}
          renderer={renderer}
        />
      );
    }
  };

  const closeDetails = () => {
    setLaundryOrderSummary(null);
  }

  const handleViewDetails = async (order) => {
    // setLaundryOrderSummary(order);
    try {
      const res = await fetch("/api/laundrybin", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch orders");
      }

      const response = await res.json();
      const laundryData = response.laundryData || [];
      const selectedOrder = laundryData.find((laundryOrder) => laundryOrder._id === order.laundryBinId);

      setSelectedOrder(selectedOrder);
      setLaundryOrderSummary(true);

    } catch (error) {
      console.error("Error loading orders: ", error);
    }
  };

  return (
    <>
      <div className="laundryBin-container">
        <div className="blue-container">
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
                    <TableCell className="table-header">Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {mobileOrders
                    .slice(
                    (currentPage - 1) * entriesPerPage,
                    currentPage * entriesPerPage
                  ).
                    map((order) => (
                      <TableRow
                        key={order._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell className="table-body">{order.date}</TableCell>
                        <TableCell className="table-body">{order.name}</TableCell>
                        <TableCell className="">{order.machineNo}</TableCell>
                        <TableCell className="">
                          <MachineToggle
                            disabled={
                              computedDate(getOrderStartTimeDryer(order._id)) >
                              0 || false
                            }
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
                        <TableCell className="">{order.dryerNo}</TableCell>
                        <TableCell className="">
                          <DryerToggle
                            disabled={
                              computedDate(getOrderStartTime(order._id)) > 0 ||
                              false
                            }
                            isChecked={
                              computedDate(getOrderStartTimeDryer(order._id)) >
                              0 || false
                            }
                            onToggle={() => onDryerToggleChange(order._id)}
                          />
                        </TableCell>
                        <TableCell className="">
                          {getCountDownTimerDryer(order._id)}
                        </TableCell>
                        <TableCell className="table-body">
                          <Button
                            variant="outlined"
                            id="status-button"
                            style={{ borderColor: '#b57b24', color: '#b57b24' }}
                          // onClick={}
                          >
                            Shipped
                          </Button>
                        </TableCell>
                        <TableCell className="table-body">
                          <Button
                            variant="outlined"
                            id="view-button"
                            onClick={() => handleViewDetails(order)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="pagination">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              <ArrowBackIosRoundedIcon />
            </button>
            <span>{`Showing entries ${startRange}-${endRange} of ${mobileOrders.length}`}</span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ArrowForwardIosRoundedIcon />
            </button>
          </div>
        </div>
      </div>
      {/* {laundryOrderSummary && (
        <Details selectedOrder={laundryOrderSummary} onClose={closeDetails} />
      )} */}
        {laundryOrderSummary && (
              <Details
                selectedOrder={selectedOrder}
                onClose={() => setLaundryOrderSummary(false)}
              />
            )}
    </>
  );
};
export default LaundryBin;
