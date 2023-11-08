"use client"
import React, { useState } from 'react';
import './Machines.css';
import MachineTable from './MachineTable';
import DryerTable from './DryerTable';

function Machines() {
  const [machines, setMachines] = useState([]); // Store the list of machines

  return (
    <div className="machines-container">
      <div className="blue-container">
        <div className="top">
        <p className="table-header" style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Washing Machines</p>
          <p className="table-header" style={{ flex: 1, textAlign: 'center', fontWeight: "bold" }}>Dryer Machines</p>
        </div>
        <div className="tables-container">
          <div className="machineTable-container">
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