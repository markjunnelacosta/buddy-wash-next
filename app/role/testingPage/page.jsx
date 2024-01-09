import React from "react";
import MachineRemarksTable from "../staffBranch2/machine/MachineRemarksTable";
import DryerRemarksTable from "../staffBranch2/machine/DryerRemarksTable";
import AddMachineRemarks from "../components/forms/BRANCH2/addMachineRemarks/page";
import AddDryerRemarks from "../components/forms/BRANCH2/addDryerRemarks/page";
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
