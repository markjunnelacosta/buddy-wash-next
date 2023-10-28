import UpdateSupply from "../page";

// Function to fetch supply data from the server
const getSupply = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/supply/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supply");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditSupply({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid Supply</div>;
  }

  try {
    const supply = await getSupply(id);
    if (supply) {
      const { supplyName, productPrice} = supply;
      return (
        <UpdateSupply
          id={id}
          supplyName={supplyName}
          productPrice={productPrice}
        />
      );
    } else {
      // Handle the case where the supply is not found or other error
      return <div>Supply not found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error loading supply: {error.message}</div>;
  }
}