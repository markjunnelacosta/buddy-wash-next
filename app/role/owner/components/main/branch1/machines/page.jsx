"use client";
import React from 'react';
import './Machines.css';
import './MachineTable';
import './dryerTable';
import AddMachines from './MachineTable';
import AddDryer from './dryerTable';

function Machines() {
    return (
        <div className="machines-container">

            <div className="blue-container">
                <div className="top" >
                    <p style={{ fontWeight: "bold", fontSize: "15px" }}>Washing Machine</p>
                    <p style={{ fontWeight: "bold", fontSize: "15px" }}>Dryer</p>
                </div>
                <div className="tables-container" >
                    <div className="machineTable-container">{AddMachines()}</div>

                    <div className="dryerTable-container">{AddDryer()}</div>
                </div>


            </div>

        </div>
    )
}
export default Machines;