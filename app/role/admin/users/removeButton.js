"use client";

// import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function RemoveButton({ id }) {
  const router = useRouter();

  const removeUser = async () => {
    const confirmed = confirm("Are you sure you want to remove this User?");

    if (confirmed) {
      const res = await fetch(`http://localhost:3000/api/user?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } 
    }
  };

  return (
    <Button
      onClick={removeUser}
      variant="outlined"
      id="delete-button"
      href="/role/admin/users"
    >
      Delete
    </Button>
  );
  }