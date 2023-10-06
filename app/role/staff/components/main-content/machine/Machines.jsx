"use client";
import React from 'react';
import './Machines.css';
import './MachineTable';
import'./DryerTable';
import AddMachine from './MachineTable';
import AddDryer from './DryerTable';

function Machines(){
    return(
        <div className="machines-container">
           
            <div className="blue-container">
                <div className="top" >
                    <p style={{fontWeight:"bold", fontSize:"15px"}}>Washing Machines</p>
                    <p style={{fontWeight:"bold", fontSize:"15px"}}>Dryers</p>
                </div>
                <div className="tables-container" >    
                    <div className="machineTable-container">{AddMachine()}</div>
                    
                    <div className="dryerTable-container">{AddDryer()}</div>
                </div>                            
                    
               
            </div>

        </div>
    )
}
export default Machines;