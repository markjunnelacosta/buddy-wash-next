"use client";
import React from 'react';
import './Machines.css';
import MachineTable from './MachineTable';
import DryerTable from './DryerTable';

function Machines() {
    return (
        <div className="machines-container">
            <div className="blue-container">
                <div className="top">
                    <p className="table-header">Laundry Machine</p>
                    <p className="table-header">Dryer</p>
                </div>
                <div className="tables-container">
                    <div className="machineTable-container">
                        <MachineTable />
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


// "use client";
// import React from 'react';
// import './Machines.css';
// import './MachineTable';
// import './dryerTable';
// import AddMachines from './MachineTable';
// import AddDryer from './dryerTable';

// function Machines() {
//     return (
//         <div className="machines-container">

//             <div className="blue-container">
//                 <div className="top" >
//                     <p style={{ fontWeight: "bold", fontSize: "15px" }}>Laundry Machine</p>
//                     <p style={{ fontWeight: "bold", fontSize: "15px" }}>Dryer</p>
//                 </div>
//                 <div className="tables-container" >
//                     <div className="machineTable-container">{AddMachines()}</div>

//                     <div className="dryerTable-container">{AddDryer()}</div>
//                 </div>


//             </div>

//         </div>
//     )
// }
// export default Machines;