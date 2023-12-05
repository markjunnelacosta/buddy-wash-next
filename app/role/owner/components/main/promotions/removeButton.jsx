"use client";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import "./voucherTable.css";
export default function RemoveButton({ id }) {
  const router = useRouter();

  const removeVoucher = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      const res = await fetch(`/api/voucher?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete();
      }
    }
  };

  return (
    <Button
      onClick={removeVoucher}
      variant="outlined"
      id="delete-button"
      href="/role/owner/components/main/promotions"
    >
      Archive
    </Button>
  );
}
