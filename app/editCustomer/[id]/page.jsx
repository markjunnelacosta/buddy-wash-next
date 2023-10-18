import UpdateCustomerForm from "@/app/role/components/forms/updateCustomer/page";

const getCustomerById = async (id) => {
  try {
    const res = await fetch(`http://localhost:3000/api/customer/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch customer");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditCustomer({ params }) {
  const { id } = params;
  const { customer } = await getCustomerById(id);
  const { customerName, customerNumber } = customer;

  return (
    <UpdateCustomerForm
      id={id}
      customerName={customerName}
      customerNumber={customerNumber}
    />
  );
}
