"use client";

// import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function RemoveButton({ id }) {
  const router = useRouter();

  const removeBranch = async () => {
    const confirmed = confirm("Are you sure you want to archive this Branch?");

    if (confirmed) {
      const res = await fetch(`/api/branch?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } 
    }
  };

  return (
    <Button
      onClick={removeBranch}
      variant="outlined"
      id="delete-button"
      href="/role/admin/branches"
    >
      Delete
    </Button>
  );
  }