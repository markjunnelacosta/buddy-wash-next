"use client";

// import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

export default function RemoveButton({ id }) {
  const router = useRouter();

  const removeStaff = async () => {
    const confirmed = confirm("Are you sure you want to archive this Staff?");

    if (confirmed) {
      const res = await fetch(`/api/branch-staff?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } 
    }
  };

  return (
    <Button
      onClick={removeStaff}
      variant="outlined"
      id="delete-button"
      href="/role/admin/branches/"
    >
      Archive
    </Button>
  );
  }