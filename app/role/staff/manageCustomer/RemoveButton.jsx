"use client";

// import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import "./CustomerTable.css";
export default function RemoveButton({ id }) {
  const router = useRouter();
  const removeCustomer = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/customer?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <Button
      onClick={removeCustomer}
      variant="outlined"
      id="delete-button"
      href="/role/staff/manageCustomer"
    >
      Delete
    </Button>
  );
}
