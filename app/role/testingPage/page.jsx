import React from "react";
import MachineRemarksTable from "../staff/machine/MachineRemarksTable";
import DryerRemarksTable from "../staff/machine/DryerRemarksTable";
import AddMachineRemarks from "../components/forms/addMachineRemarks/page";
import AddDryerRemarks from "../components/forms/addDryerRemarks/page";
const TestingPage = () => {
  return (
    <div>
      <AddMachineRemarks />
      <MachineRemarksTable />
      <AddDryerRemarks />
      <DryerRemarksTable />
    </div>
  );
};

export default TestingPage;
