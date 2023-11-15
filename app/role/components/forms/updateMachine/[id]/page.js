import UpdateMachine from "../page";

// Function to fetch machine data from the server
const getMachine = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/machine/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch machine");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditMachine({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid Machine</div>;
  }

  try {
    const machine = await getMachine(id);
    if (machine) {
      const { machineNumber, action, timer, queue, useCount, status } = machine;
      return (
        <UpdateMachine
          id={id}
          machineNumber={machineNumber}
          action={action}
          timer={timer}
          queue={queue}
          useCount={useCount}
          status={status}
        />
      );
    } else {
      
      return <div>Machine not found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error loading machine: {error.message}</div>;
  }
}
