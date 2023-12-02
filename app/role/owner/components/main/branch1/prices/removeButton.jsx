"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import "./priceTable.css";

export default function RemoveButton({ id }) {
  const router = useRouter();

  const removeSupply = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/supply?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
       router.refresh();
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
      Archive
    </Button>
  );
}
