import UpdateLaundryMode from "../page";

const getLaundryMode = async (id) => {
    try {
      const res = await fetch(`/api/laundry-price/${id}`, {
        cache: "no-store",
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch laundry details");
      }
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  export default async function EditLaundryMode({ params }) {
    const { id } = params;
  
    if (!id) {
      return <div>Invalid laundry mode id</div>;
    }
  
    try {
      const mode = await getLaundryMode(id);
      if (mode) {
        const { modeName, price } = mode;
        return (
          <UpdateLaundryMode
            id={id}
            modeName={modeName}
            price={price}
          />
        );
      } else {
        return <div>Laundry mode not found</div>;
      }
    } catch (error) {
      console.error(error);
      return <div>Error loading laundry mode: {error.message}</div>;
    }
  }