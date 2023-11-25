import UpdateUser from "@/app/role/admin/users/edit-users/page";

// Function to fetch user data from the server
const getUsers = async (id) => {
  try {
    const res = await fetch(`/api/user/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch users");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditUser({ params }) {
  const { id } = params;

  if (!id) {
    return <div>Invalid user ID</div>;
  }

  try {
    const user = await getUsers(id);
    if (user) {
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
    } else {
      // Handle the case where the user is not found or other error
      return <div>User not found</div>;
    }
  } catch (error) {
    console.error(error);
    return <div>Error loading user: {error.message}</div>;
  }
}