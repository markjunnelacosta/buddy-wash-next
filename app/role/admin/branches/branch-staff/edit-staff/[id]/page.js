import UpdateStaff from "../page";


const getStaff = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/branch-staff/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch branch staff");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditStaff({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid Staff ID</div>;
  }

  try {
    const branchStaff = await getStaff(id);
    if (branchStaff) {
      const { staffName, staffAddress, phoneNumber, staffPosition } = staff;
      return (
        <UpdateStaff
          id={id}
          staffName={staffName}
          staffAddress={staffAddress}
          phoneNumber={phoneNumber}
          staffPosition={staffPosition}
        />
      );
    } else {

      return <div>Branch Staff not found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error loading branch staff: {error.message}</div>;
  }
}