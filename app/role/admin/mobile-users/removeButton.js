"use client";

// import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function RemoveButton({ id }) {
  const router = useRouter();

  const removeMobileUser = async () => {
    const confirmed = confirm("Are you sure you want to remove this Mobile User?");

    if (confirmed) {
      const res = await fetch(`/api/mobile-users?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } 
    }
  };

  return (
    <Button
      onClick={removeMobileUser}
      variant="outlined"
      id="delete-button"
      href="/role/admin/mobile-users"
    >
      Delete
    </Button>
  );
  }