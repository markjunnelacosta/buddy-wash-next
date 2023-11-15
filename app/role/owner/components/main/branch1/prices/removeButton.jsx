"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import "./priceTable.css";
export default function RemoveButton({ id }) {
  const router = useRouter();

  const removeSupply = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/supply?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete();
      }
    }
  };

  return (
    <Button
      onClick={removeSupply}
      variant="outlined"
      id="delete-button"
      href="/role/owner/components/main/branch1/prices"
    >
      Delete
    </Button>
  );
}
