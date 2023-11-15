// // src/data/usersData.js

// // Function to fetch user data from the server
// export const getUsers = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/user", {
//         cache: "no-store",
//       });
  
//       if (!res.ok) {
//         throw new Error("Failed to fetch users");
//       }
  
//       const response = await res.json();
//       return response.userData || [];
//     } catch (error) {
//       console.log("Error loading users: ", error);
//     }
//   };
  