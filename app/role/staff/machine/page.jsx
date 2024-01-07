"use client";
import React, { useState } from "react";
import "./machineStaff.css";
import MachineTable from "./MachineTable";
import DryerTable from "./DryerTable";
import Reset from "./resetBtn";
import MachineRemarksTable from "./MachineRemarksTable";
import DryerRemarksTable from "./DryerRemarksTable";
import AddMachineRemarks from "../../components/forms/addMachineRemarks/page";
import AddDryerRemarks from "../../components/forms/addDryerRemarks/page";
import MachineReportsTable from "./MachineReportsTable";
import DryerReportsTable from "./DryerReportsTable";
const getMachineRemarks = async () => {
  try {
    const res = await fetch("/api/machineRemarks", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch machine remarks");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.machineRemarks;
  } catch (error) {
    console.log("Error loading machine remarks. ", error);
  }
};
const getDryerRemarks = async () => {
  try {
    const res = await fetch("/api/dryerRemarks", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dryer remarks");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.dryerRemarks;
  } catch (error) {
    console.log("Error loading dryer remarks. ", error);
  }
};

function Machines() {
  const [machines, setMachines] = useState([]); // Store the list of machines
  const [machineRemarks, setMachineRemarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dryerRemarks, setDryerRemarks] = useState([]);
  const [dryerSearchQuery, setDryerSearchQuery] = useState("");
  React.useEffect(() => {
    const fetchMachineRemarks = async () => {
      try {
        const machineRemarksData = await getMachineRemarks();
        setMachineRemarks(machineRemarksData);
      } catch (error) {
        console.error("Error fetching machine Remarks:", error);
      }
    };

    fetchMachineRemarks();
  }, []);

  React.useEffect(() => {
    console.log(machineRemarks);
  }, [machineRemarks]);

  // Filter users based on search query
  const filteredMachineRemarks = machineRemarks.filter((machineRemarks) =>
    machineRemarks.number.includes(searchQuery)
  );
  React.useEffect(() => {
    const fetchDryerRemarks = async () => {
      try {
        const dryerRemarksData = await getDryerRemarks();
        setDryerRemarks(dryerRemarksData);
      } catch (error) {
        console.error("Error fetching dryer Remarks:", error);
      }
    };

    fetchDryerRemarks();
  }, []);

  React.useEffect(() => {
    console.log(dryerRemarks);
  }, [dryerRemarks]);

  // Filter users based on search query
  const filteredDryerRemarks = dryerRemarks.filter((dryerRemarks) =>
    dryerRemarks.number.includes(dryerSearchQuery)
  );

  return (
    <div className="machines-container">
      <div className="blue-container">
        <div className="button-container">
          <Reset />
        </div>
        <div className="top">
          <p
            className="table-header"
            style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Washing Machines
          </p>
          <p
            className="table-header"
            style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Dryer Machines
          </p>
        </div>

        <div className="tables-container">
          <div className="machineTableContainer">
            <MachineTable machines={machines} />
          </div>
          <div className="dryerTableContainer">
            <DryerTable />
          </div>
        </div>
        <div className="remarks-top">
          <div className="searchContainer">
            <p style={{ fontWeight: "bold", marginRight: "80px" }}>
              MACHINE REMARKS
            </p>

            <AddMachineRemarks />
          </div>

          <div className="searchContainer">
            <p style={{ fontWeight: "bold", marginRight: "80px" }}>
              DRYER REMARKS
            </p>

            <AddDryerRemarks />
          </div>
        </div>
        <div className="remarks-container">
          <div className="machineRemarksContainer">
            <MachineRemarksTable />
          </div>
          <div className="dryerRemarksContainer">
            <DryerRemarksTable />
          </div>
        </div>
        <div className="top-reports">
          <p
            className="table-header"
            style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Machines Report
          </p>
          <p
            className="table-header"
            style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Dryers Report
          </p>
        </div>
        <div className="reports-container">
          <div className="machineReportsContainer">
            <MachineReportsTable />
          </div>
          <div className="dryerReportsContainer">
            <DryerReportsTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Machines;
