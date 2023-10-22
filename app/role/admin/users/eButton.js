"use client";
import { useRouter } from 'next/navigation';
import Button from "@mui/material/Button";

const EditButton = ({ userId }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/edit-users/${userId}`); // Navigate to the edit page
  };

  return (
    <Button variant="outlined" id="edit-button" onClick={handleEditClick}>
      Edit
    </Button>
  );
};

export default EditButton;
