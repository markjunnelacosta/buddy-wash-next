import UpdateDryer from "../page";

// Function to fetch dryer data from the server
const getDryer = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/dryer/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dryer");
    }

    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export default async function EditDryer({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid Dryer</div>;
  }

  try {
    const dryer = await getDryer(id);
    if (dryer) {
      const { dryerNumber, action, timer, queue, useCount, status } = dryer;
      return (
        <UpdateDryer
          id={id}
          dryerNumber={dryerNumber}
          action={action}
          timer={timer}
          queue={queue}
          useCount={useCount}
          status={status}
        />
      );
    } else {

      return <div>Dryer not found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error loading dryer: {error.message}</div>;
  }
}
