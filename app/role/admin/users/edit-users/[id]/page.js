import { useRouter } from "next/router";
import UpdateUser from "../page";

// Function to fetch user data from the server
const getUsers = async () => {
  try {
    const res = await fetch("/api/user", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    const response = await res.json();
    return response.userData || [];
  } catch (error) {
    console.log("Error loading users: ", error);
  }
};

export default async function EditUser() {
  const router = useRouter();
  const { id } = router.query;
  const { user } = await getUsers(id);
  const { userName, phoneNumber, userAddress, userRole, userId, password } = user;

  return (
    <UpdateUser
      id={id}
      userName={userName}
      phoneNumber={phoneNumber}
      userAddress={userAddress}
      userRole={userRole}
      userId={userId}
      password={password}
    />
  );
}
