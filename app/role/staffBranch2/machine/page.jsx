"use client";
import React, { useState } from "react";
import "./machineStaff.css";
import MachineTable from "./MachineTable";
import DryerTable from "./DryerTable";
import Reset from "./resetBtn";
import MachineRemarksTable from "./MachineRemarksTable";
import DryerRemarksTable from "./DryerRemarksTable";
import AddMachineRemarks from "../../components/forms/BRANCH2/addMachineRemarks/page";
import AddDryerRemarks from "../../components/forms/BRANCH2/addDryerRemarks/page";
import MachineReportsTable from "./MachineReportsTable";
import DryerReportsTable from "./DryerReportsTable";

function Machines() {
  const [machines, setMachines] = useState([]); // Store the list of machines
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
