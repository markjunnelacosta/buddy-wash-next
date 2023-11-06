import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';

function AddMachine({ onAddMachine }) {
  const [open, setOpen] = useState(false);
  const [machineName, setMachineName] = useState('');
  const [machineType, setMachineType] = useState('wash'); // Default to 'wash'
  const [timerMinutes, setTimerMinutes] = useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMachine = () => {
    // Add the logic to add a new machine
    const newMachine = {
      name: machineName,
      type: machineType,
      timerMinutes: timerMinutes,
    };
    onAddMachine(newMachine);
    handleClose();
  };

//   return (
//     <div>
//       <Button
//         variant="contained"
//         onClick={handleClickOpen}
//         style={{
//           backgroundColor: 'white',
//           color: 'black',
//           width: '200px',
//           height: '50px',
//           fontWeight: 'bold',
//           alignSelf: 'flex-end',
//           margin: '30px',
//           borderRadius: '10px',
//         }}
//       >
//         New Machine
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>New Machine</DialogTitle>
//         <DialogContent>
//           <div className="add-machine-form">
//             <div className="input">
//               <div className="machine-name">
//                 <p>Name</p>
//                 <TextField
//                   className="text-box"
//                   value={machineName}
//                   onChange={(e) => setMachineName(e.target.value)}
//                 />
//               </div>
//               <div className="machine-type">
//                 <p>Type</p>
//                 <FormControl>
//                   <InputLabel>Type</InputLabel>
//                   <Select
//                     value={machineType}
//                     onChange={(e) => setMachineType(e.target.value)}
//                   >
//                     <MenuItem value="wash">Wash</MenuItem>
//                     <MenuItem value="dryer">Dryer</MenuItem>
//                   </Select>
//                 </FormControl>
//               </div>
//               <div className="timer-minutes">
//                 <p>Timer (minutes)</p>
//                 <TextField
//                   className="text-box"
//                   value={timerMinutes}
//                   onChange={(e) => setTimerMinutes(e.target.value)}
//                   type="number"
//                 />
//               </div>
//             </div>
//           </div>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             className="dialog-button"
//             onClick={handleAddMachine}
//           >
//             Save
//           </Button>
//           <Button
//             className="dialog-button"
//             onClick={handleClose}
//           >
//             Cancel
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
}

export default AddMachine;
