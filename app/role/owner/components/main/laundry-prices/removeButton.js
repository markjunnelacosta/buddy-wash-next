"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import "./laundryPrice.css";
export default function RemoveButton({ id }) {
  const router = useRouter();

  const removeLaundryMode = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/laundry-price?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete();
      }
    }
  };

  return (
    <Button
      onClick={removeLaundryMode}
      variant="outlined"
      id="delete-button"
      href="/role/owner/components/main/laundry-prices"
    >
      Delete
    </Button>
  );
}
