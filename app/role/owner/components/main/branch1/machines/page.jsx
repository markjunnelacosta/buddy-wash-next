"use client";
import React from 'react';
import './Machines.css';
import './MachinesTable';
import './dryerTable';
import AddMachines from './MachinesTable';
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
                    <div className="machinesTable-container">{AddMachines()}</div>

                    <div className="dryerTable-container">{AddDryer()}</div>
                </div>


            </div>

        </div>
    )
}
export default Machines;