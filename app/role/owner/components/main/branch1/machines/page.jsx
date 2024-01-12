"use client";
import React, { useState } from "react";
import "./machines.css";
import MachineTable from "./machineTable";
import DryerTable from "./dryerTable";
import MachineRemarksTable from "./machineRemarksTable";
import DryerRemarksTable from "./dryerRemarksTable";
import MachineReportsTable from "./machineReportsTable";
import DryerReportsTable from "./dryerReportsTable";

// const getMachineRemarks = async () => {
//   try {
//     const res = await fetch("/api/machineRemarks", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch machine remarks");
//     }

//     // console.log(await res.json());
//     const response = await res.json();
//     return response.machineRemarks;
//   } catch (error) {
//     console.log("Error loading machine remarks. ", error);
//   }
// };
// const getDryerRemarks = async () => {
//   try {
//     const res = await fetch("/api/dryerRemarks", {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error("Failed to fetch dryer remarks");
//     }

//     // console.log(await res.json());
//     const response = await res.json();
//     return response.dryerRemarks;
//   } catch (error) {
//     console.log("Error loading dryer remarks. ", error);
//   }
// };

function Machines() {
  const [machines, setMachines] = useState([]); // store list of machines
  const [machineRemarks, setMachineRemarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [dryerRemarks, setDryerRemarks] = useState([]);
  const [dryerSearchQuery, setDryerSearchQuery] = useState("");

  //   React.useEffect(() => {
  //     const fetchMachineRemarks = async () => {
  //       try {
  //         const machineRemarksData = await getMachineRemarks();
  //         setMachineRemarks(machineRemarksData);
  //       } catch (error) {
  //         console.error("Error fetching machine Remarks:", error);
  //       }
  //     };

  //     fetchMachineRemarks();
  //   }, []);

  //   React.useEffect(() => {
  //     console.log(machineRemarks);
  //   }, [machineRemarks]);

  //   // Filter users based on search query
  //   const filteredMachineRemarks = machineRemarks.filter((machineRemarks) =>
  //     machineRemarks.number.includes(searchQuery)
  //   );
  //   React.useEffect(() => {
  //     const fetchDryerRemarks = async () => {
  //       try {
  //         const dryerRemarksData = await getDryerRemarks();
  //         setDryerRemarks(dryerRemarksData);
  //       } catch (error) {
  //         console.error("Error fetching dryer Remarks:", error);
  //       }
  //     };

  //     fetchDryerRemarks();
  //   }, []);

  //   React.useEffect(() => {
  //     console.log(dryerRemarks);
  //   }, [dryerRemarks]);

  //   // Filter users based on search query
  //   const filteredDryerRemarks = dryerRemarks.filter((dryerRemarks) =>
  //     dryerRemarks.number.includes(dryerSearchQuery)
  //   );

  return (
    <div className="machines-container">
      <div className="blue-container">
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
          <div className="machineTable-container">
            <MachineTable machines={machines} />
          </div>
          <div className="dryerTable-container">
            <DryerTable />
          </div>
        </div>

        <div className="top">
          <p
            className="table-header"
            style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Machine Remarks
          </p>
          <p
            className="table-header"
            style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Dryer Remarks
          </p>
        </div>
        <div className="tables-container">
          <div className="machineTable-container">
            <MachineRemarksTable />
          </div>
          <div className="dryerTable-container">
            <DryerRemarksTable />
          </div>
        </div>

        <div className="top">
          <p
            className="table-header"
            style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Machine Reports
          </p>
          <p
            className="table-header"
            style={{ flex: 1, textAlign: "center", fontWeight: "bold" }}
          >
            Dryer Reports
          </p>
        </div>
        <div className="tables-container">
          <div className="machineTable-container">
            <MachineReportsTable />
          </div>
          <div className="dryerTable-container">
            <DryerReportsTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Machines;
