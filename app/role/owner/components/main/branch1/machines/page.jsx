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


  // const addNewMachine = () => {
  //   if (isValidInput(newMachine.number)) {
  //     if (!isNumberRepeated(newMachine.number)) {
  //       // Create a new machine object with the data of the new machine
  //       const newMachineObject = {
  //         number: newMachine.number,
  //         action: 'Off',
  //         timer: '0:00',
  //         queue: 0,
  //         useCount: 0,
  //       };

  //       // Make a POST request to the API to add the new machine
  //       fetch('http://localhost:3000/api/machine', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify(newMachineObject),
  //       })
  //         .then((response) => {
  //           if (!response.ok) {
  //             throw new Error('Failed to add a new machine');
  //           }
  //           return response.json();
  //         })
  //         .then((data) => {
  //           // Handle the response data if needed
  //           // Refresh the machine data from the API
  //           fetchData();
  //         })
  //         .catch((error) => {
  //           console.error('Error adding a new machine:', error);
  //         });

  //       // Update the state and reset input fields
  //       setMachineData((prevData) => [
  //         ...prevData,
  //         {
  //           id: prevData.length + 1,
  //           ...newMachineObject,
  //         },
  //       ]);
  //       setNewMachine({ number: '' });
  //       setInputError('');
  //     } else {
  //       setInputError('The number already exists');
  //     }
  //   } else {
  //     setInputError('Please enter a valid integer between 1 and 25');
  //   }
  // };

    // useEffect(() => {
  //   const initialMachineData = [
  //     { id: 1, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '1' },
  //     { id: 2, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '2' },
  //     { id: 3, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '3' },
  //     { id: 4, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '4' },
  //     { id: 5, action: 'Off', timer: '0:00', queue: 0, useCount: 0, number: '5' }
  //     // Add more machines as needed
  //   ];
  //   setMachineData(initialMachineData);
  // }, []);

    // const isValidInput = (input) => {
  //   const number = parseInt(input);
  //   return !isNaN(number) && number >= 1 && number <= 25;
  // }

  // const isNumberRepeated = (number) => {
  //   return machineData.some((machine) => machine.number === number);
  // }

  // const fetchData = () => {
  //   // Fetch machine data from the API and update machineData state
  //   fetch('http://localhost:3000/api/machine', {
  //     cache: 'no-store',
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Failed to fetch machine data');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setMachineData(data.machines); // Assuming the API returns an array of machines
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching machine data:', error);
  //     });
  // };