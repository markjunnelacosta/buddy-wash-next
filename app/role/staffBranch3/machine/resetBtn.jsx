"use client";

import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
// import "./CustomerTable.css";

const Reset = () => {
  const [machineData, setMachineData] = useState([]);
  const [dryerData, setDryerData] = useState([]);
  const [machineInfo, setMachineInfo] = useState([]);
  const [dryerInfo, setDryerInfo] = useState([]);

  var today = new Date();
  var date =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes();
  var dateTime = date;

  const fetchMachines = () => {
    fetch("/api/BRANCH3/branch3Machine", {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch machine data");
        }
        return response.json();
      })
      .then((data) => {
        const mData = data.machineData || [];
        setMachineData(mData);

        // Update machine state
        const machineUseCount = [];
        mData.forEach((m) => {
          machineUseCount.push({
            date: dateTime,
            type: "Washing Machine",
            machineNumber: m.machineNumber,
            useCount: m.useCount,
          });
        });
        console.log("machineInfo", machineUseCount);
        setMachineInfo(machineUseCount);
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
    fetch("/api/BRANCH3/branch3Dryer", {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch dryer data");
        }
        return response.json();
      })
      .then((data) => {
        const dData = data.dryerData || [];
        setDryerData(dData);
        const dryerUseCount = [];
        dData.forEach((d) => {
          dryerUseCount.push({
            date: dateTime,
            type: "Dryer",
            dryerNumber: d.dryerNumber,
            useCount: parseInt(d.useCount),
          });
        });
        console.log("dryerInfo", dryerUseCount);
        setDryerInfo(dryerUseCount);
      })
      .catch((error) => {
        console.error("Error fetching dryer data:", error);
      });
  };

  useEffect(() => {
    fetchDryer();
  }, []);
  console.log("********dryer data", dryerData);

  const postMachineData = () => {
    machineInfo.forEach(async (m) => {
      const response = await fetch("/api/BRANCH3/branch3MachineReport", {
        method: "POST",
        body: JSON.stringify({
          date: m.date,
          type: m.type,
          machineNumber: m.machineNumber,
          useCount: m.useCount,
        }),
      });
      console.log(response);
      console.log("added report");
    });
  };

  const postDryerData = () => {
    dryerInfo.forEach(async (d) => {
      const response = await fetch("/api/BRANCH3/branch3DryerReport", {
        method: "POST",
        body: JSON.stringify({
          date: d.date,
          type: d.type,
          dryerNumber: d.dryerNumber,
          useCount: d.useCount,
        }),
      });
      console.log(response);
      console.log("added report");
    });
  };

  const patchMachineUseCount = () => {
    machineData.forEach(async (m) => {
      const res = await fetch(`/api/BRANCH3/branch3Machine?id=${m._id}`, {
        method: "PATCH",
        body: JSON.stringify({ useCount: +0 }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("UseCount is updated");
    });
  };

  const patchDryerUseCount = () => {
    dryerData.forEach(async (d) => {
      const res = await fetch(`/api/BRANCH3/branch3Dryer?id=${d._id}`, {
        method: "PATCH",
        body: JSON.stringify({ useCount: +0 }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("UseCount is updated");
      window.location.reload();
    });
  };
  const onReset = async () => {
    postMachineData();
    postDryerData();
    patchMachineUseCount();
    patchDryerUseCount();
  };

  return (
    <Button
      style={{
        backgroundColor: "white",
        color: "black",
        width: "200px",
        height: "50px",
        fontWeight: "bold",
        alignSelf: "flex-end",
        margin: "30px",
        borderRadius: "10px",
      }}
      variant="contained"
      onClick={onReset}
      // href="/role/staff/machine"
    >
      Reset Machines
    </Button>
  );
};

export default Reset;
