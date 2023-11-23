"use client";
import React, { useState, useEffect } from "react";
import "./addLaundry.css";
import { Select } from "@mui/material";
import { Autocomplete, TextField } from "@mui/material";

const AddLaundry = ({ isOpen, onClose, onSaveData, onUpdateSupply }) => {
  const [customerData, setCustomerData] = useState([]); // State for customers
  const [supplyData, setSupplyData] = useState([]); // State for supplies

  const [customerName, setCustomerName] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [weight, setWeight] = useState("");
  const [washMode, setWashMode] = useState("");
  const [dryMode, setDryMode] = useState("");
  const [fold, setFold] = useState("");
  const [colored, setColored] = useState("");
  const [detergent, setDetergent] = useState("");
  const [fabCon, setFabCon] = useState("");
  const [detergentQty, setDetergentQty] = useState("");
  const [fabConQty, setFabConQty] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [refNum, setRefNum] = useState("");
  const [machineData, setMachineData] = useState([]);
  const [dryerData, setDryerData] = useState([]);
  let stock = 0;

  const weightPrice = {
    "7.5Kg": 10,
    "8-9Kg": 20,
  };

  const washModePrice = {
    "Spin": 40,
    "Rinse & Spin": 50,
    "Regular Wash": 60,
    "Premium": 70,
  };

  const dryModePrice = {
    "30mins.": 0,
    "40mins.": 0,
    "50mins.": 10,
  };

  const foldPrice = 70;

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
    fetchMachines();
  }, []);

  const assignMachine = () => {
    console.log(machineData);
    const availableMachine = machineData.find((m) => m.timer === "00:00");
    console.log("available machines" + availableMachine);
    return +availableMachine.machineNumber;
  };

  const fetchDryers = () => {
    fetch("http://localhost:3000/api/dryer", {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dryer data");
        }
        return response.json();
      })
      .then((data) => {
        setDryerData(data.dryerData || []); // Update dryerData state
      })
      .catch((error) => {
        console.error("Error fetching dryer data:", error);
      });
  };

  useEffect(() => {
    fetchDryers();
  }, []);

  const assignDryer = () => {
    console.log(dryerData);
    const availableDryer = dryerData.find((d) => d.timer === "00:00");
    console.log("available dryers" + availableDryer);
    return +availableDryer.dryerNumber;
  };

  const onClick = async () => {
    const totalWeightPrice = weightPrice[weight] || 0;
    const totalWashModePrice = washModePrice[washMode] || 0;
    const totalDryModePrice = dryModePrice[dryMode] || 0;
    const totalFoldPrice = fold === "Yes" ? foldPrice : 0;

    const machineNo = assignMachine();
    const dryerNo = assignDryer();

    const totalAmount =
      totalWeightPrice +
      totalWashModePrice +
      totalDryModePrice +
      totalFoldPrice;

    console.log(
      customerName,
      orderDate,
      weight,
      washMode,
      dryMode,
      fold,
      colored,
      detergent,
      fabCon,
      detergentQty,
      fabConQty,
      paymentMethod,
      refNum
    );

    const response = await fetch("/api/laundrybin", {
      method: "POST",
      body: JSON.stringify({
        customerName: customerName,
        orderDate: orderDate,
        weight: weight,
        washMode: washMode,
        dryMode: dryMode,
        fold: fold,
        colored: colored,
        detergent: detergent,
        fabcon: fabCon,
        detergentQty: detergentQty,
        fabconQty: fabConQty,
        paymentMethod: paymentMethod,
        refNum: refNum,
      }),
    });

    const res = await fetch("/api/report", {
      method: "POST",
      body: JSON.stringify({
        customerName: customerName,
        reportDate: orderDate,
        totalAmount: totalAmount,
      }),
    });

    const orderRes = await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        date: orderDate,
        name: customerName,
        machineNo: machineNo,
        machineAction: "",
        machineTimer: "",
        dryerNo: dryerNo,
        dryerAction: "",
        dryerTimer: "",
        status: "",
      }),
    });

    console.log(response);
    console.log(res);
    console.log("orderszzzzzz" + orderRes);

    // Update available stock for selected detergent and fabric conditioner
    if (detergent && detergentQty) {
      const selectedDetergent = supplyData.find(
        (supply) => supply.supplyName === detergent
      );
      stock = parseInt(selectedDetergent.availableStock, 10) - +detergentQty; //
      if (selectedDetergent) {
        // const supplyUpdateResponse = await fetch(`/api/laundry-supply/${encodeURIComponent(selectedDetergent._id)}`, {
        //   method: "PATCH",
        //   body: JSON.stringify({
        //     quantity: detergentQty, // Subtract the used quantity
        //   }),
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        // });

        // console.log(supplyUpdateResponse);
        const res = await fetch(
          `http://localhost:3000/api/supply?id=${selectedDetergent._id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ availableStock: stock }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          console.log("Supply record updated successfully");
        } else {
          console.error("Failed to update supply record");
        }
        window.location.reload();
      }
    }

    if (fabCon && fabConQty) {
      const selectedFabCon = supplyData.find(
        (supply) => supply.supplyName === fabCon
      );
      stock = parseInt(selectedFabCon.availableStock, 10) - +fabConQty;
      if (selectedFabCon) {
        // const supplyUpdateResponse = await fetch(
        //   `/api/laundry-supply/${encodeURIComponent(selectedFabCon._id)}`,
        //   {
        //     method: "PATCH",
        //     body: JSON.stringify({
        //       quantity: fabConQty, // Subtract the used quantity
        //     }),
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //   }
        // );

        // console.log(supplyUpdateResponse);
        const res = await fetch(
          `http://localhost:3000/api/supply?id=${selectedFabCon._id}`,
          {
            method: "PATCH",
            body: JSON.stringify({ availableStock: stock }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.ok) {
          console.log("Supply record updated successfully");
        } else {
          console.error("Failed to update supply record");
        }
        window.location.reload();
      }
    }

    onSaveData();
    onClose();
  };

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const res = await fetch("/api/customer", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch customer");
        }

        const response = await res.json();
        setCustomerData(response.customers);
      } catch (error) {
        console.error("Error fetching customer:", error);
      }
    };

    fetchCustomer();
  }, []);

  const filterSuppliesByKeyword = (supplies, keyword) => {
    return supplies.filter((supply) =>
      supply.supplyName.toLowerCase().includes(keyword)
    );
  };

  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const res = await fetch("/api/supply", {
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch supplies");
        }

        const response = await res.json();
        setSupplyData(response.supplies);
      } catch (error) {
        console.error("Error fetching supplies:", error);
      }
    };

    fetchSupplies();
  }, []);

  const getDetergentSupplies = () => {
    const detergentSupplies = filterSuppliesByKeyword(supplyData, "detergent");
    return detergentSupplies.map((supplies, i) => (
      <option key={i}>{supplies.supplyName}</option>
    ));
  };

  const getConditionerSupplies = () => {
    const conditionerSupplies = filterSuppliesByKeyword(
      supplyData,
      "conditioner"
    );
    return conditionerSupplies.map((supplies, i) => (
      <option key={i}>{supplies.supplyName}</option>
    ));
  };

  return (
    <>
      {isOpen && (
        <div className="form-container visible">
          <div>
            <p id="header">Add New Laundry</p>
            <hr />
            <div className="customer-info">
              <p>Customer Name</p>
              <Autocomplete
                className="select-name"
                value={customerName}
                onChange={(event, newValue) => setCustomerName(newValue)}
                options={customerData.map((customer) => customer.customerName)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
              <p>Date</p>
              <input
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.currentTarget.value)}
              ></input>
            </div>
            <hr />
            <div className="form-group">
              <div id="first">
                <p>Weight</p>
                <select
                  value={weight}
                  onChange={(e) => setWeight(e.currentTarget.value)}
                >
                  <option value=""></option>
                  <option value="7.5Kg">Light Clothes - 7.5kilos</option>
                  <option value="8-9Kg">Light Clothes - 8 to 9 kilos</option>
                </select>
                <p>Fold</p>
                <select
                  value={fold}
                  onChange={(e) => setFold(e.currentTarget.value)}
                >
                  <option value=""></option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <p>Detergent</p>
                <select
                  className="dropdown"
                  onChange={(e) => setDetergent(e.target.value)}
                >
                  <option value=""></option>
                  <option value="">None</option>
                  {getDetergentSupplies()}
                </select>
                <p>Detergent Qty.</p>
                <input
                  type="number"
                  value={detergentQty}
                  onChange={(e) => setDetergentQty(e.currentTarget.value)}
                ></input>
              </div>

              <div id="second">
                <p>Wash Mode</p>
                <select
                  value={washMode}
                  onChange={(e) => setWashMode(e.currentTarget.value)}
                >
                  <option value=""></option>
                  <option value="Spin">Spin - 9mins.</option>
                  <option value="Rinse & Spin">Rinse & Spin - 24mins.</option>
                  <option value="Regular Wash">Regular Wash – 37mins.</option>
                  <option value="Premium">Super/Premium Wash – 45mins.</option>
                </select>
                <p>Colored</p>
                <select
                  value={colored}
                  onChange={(e) => setColored(e.currentTarget.value)}
                >
                  <option value=""></option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <p>Fabric Conditioner</p>
                <select
                  className="dropdown"
                  onChange={(e) => setFabCon(e.target.value)}
                >
                  <option value=""></option>
                  <option value="">None</option>
                  {getConditionerSupplies()}
                </select>
                <p>Fabric Conditioner Qty.</p>
                <input
                  type="number"
                  value={fabConQty}
                  onChange={(e) => setFabConQty(e.currentTarget.value)}
                ></input>
              </div>

              <div id="third">
                <p>Dry Mode</p>
                <select
                  value={dryMode}
                  onChange={(e) => setDryMode(e.currentTarget.value)}
                >
                  <option value=""></option>
                  <option value="30mins.">30mins.</option>
                  <option value="40mins.">40mins.</option>
                  <option value="50mins.">50mins.</option>
                </select>
                <p>Pay by:</p>
                <div className="radio-label">
                  <input
                    id="radiob"
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    checked={paymentMethod === "Cash"}
                    onChange={(e) => setPaymentMethod(e.currentTarget.value)}
                  />{" "}
                  Cash
                  <input
                    id="radiob"
                    type="radio"
                    name="paymentMethod"
                    value="GCash"
                    checked={paymentMethod === "GCash"}
                    onChange={(e) => setPaymentMethod(e.currentTarget.value)}
                  />
                  Gcash
                </div>
                <p>Ref. No. for Gcash</p>
                <input
                  type="text"
                  value={refNum}
                  onChange={(e) => setRefNum(e.currentTarget.value)}
                ></input>
              </div>
            </div>
            <br />
            <button className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="save" onClick={onClick}>
              Save
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddLaundry;
