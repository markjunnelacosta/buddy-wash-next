"use client";
// import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function removeButton({ id }) {
  const router = useRouter();
  const removePrices = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/prices?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    }
  };

  return (
    <Button
      onClick={removePrices}
      variant="outlined"
      id="delete-button"
      href="/role/components/main/branch1/prices"
    >
      Delete
    </Button>
  );
}
