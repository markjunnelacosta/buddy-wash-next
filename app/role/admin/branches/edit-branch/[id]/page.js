import UpdateBranch from "@/app/role/admin/branches/edit-branch/page";


const getBranch = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/branch/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch branch");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditBranch({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid Branch ID</div>;
  }

  try {
    const branch = await getBranch(id);
    if (branch) {
      const { branchAddress, branchNumber } = branch;
      return (
        <UpdateBranch
          id={id}
          branchAddress={branchAddress}
          branchNumber={branchNumber}
        />
      );
    } else {

      return <div>Branch not found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error loading branch: {error.message}</div>;
  }
}