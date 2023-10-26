import UpdateProduct from "@/app/role/owner/components/main/branch1/prices/edit-product/page";

// Function to fetch product data from the server
const getProducts = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/product/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditProduct({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid product ID</div>;
  }

  try {
    const product = await getProducts(id);
    if (product) {
      const { productName, productPrice } = product;
      return (
        <UpdateProduct
          id={id}
          productName={productName}
          productPrice={productPrice}
        />
      );
    } else {
      // Handle the case where the product is not found or other error
      return <div>Product not found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error loading product: {error.message}</div>;
  }
}