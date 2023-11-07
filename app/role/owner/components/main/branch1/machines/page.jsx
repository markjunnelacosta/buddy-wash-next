"use client"
import React, { useState } from 'react';
import './Machines.css';
import MachineTable from './MachineTable';
import DryerTable from './DryerTable';
import AddMachine from "@/app/role/components/forms/addMachine/page";

function Machines() {
  const [machines, setMachines] = useState([]); // Store the list of machines

  const handleAddMachine = (newMachine) => {
    if (machines.length < 25) {
    // Add the new machine to the list
    setMachines([...machines, newMachine]);
    }
  };

  return (
    <div className="machines-container">
      <div className="blue-container">
        <div className="top">
        <p className="table-header" style={{ flex: 1, textAlign: 'center' }}>Washer</p>
          <p className="table-header" style={{ flex: 1, textAlign: 'center' }}>Dryer</p>
        </div>
        <div className="tables-container">
          <div className="machineTable-container">
            <AddMachine onAddMachine={handleAddMachine} />
            <MachineTable machines={machines} />
          </div>
          <div className="dryerTable-container">
            <DryerTable />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Machines;
