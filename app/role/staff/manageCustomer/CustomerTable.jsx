// import * as React from "react";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import "./CustomerTable.css";
// import Link from "next/link";

// const getCustomers = async () => {
//   try {
//     const res = await fetch("http://localhost:3000/api/customer").then(
//       (res) => res.clone().json(),
//       {
//         cache: "no-store",
//       }
//     );

//     if (!res.ok) {
//       throw new Error("Failed to fetch customers");
//     }
//     console.log(res.json());
//     return res.json();
//   } catch (error) {
//     console.log("Error loading customers: ", error);
//   }
// };
// export default async function CustomerTable() {
//   const { customers } = await getCustomers();
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
//         <TableHead>
//           <TableRow>
//             <TableCell align="center" style={{ fontWeight: "bold" }}>
//               Name{" "}
//             </TableCell>
//             <TableCell align="center" style={{ fontWeight: "bold" }}>
//               Number
//             </TableCell>
//             <TableCell align="center" style={{ fontWeight: "bold" }}>
//               Action{" "}
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {customers.map((customer) => (
//             <TableRow
//               key={customer._id}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {customer.customerName}
//               </TableCell>
//               <TableCell align="right">{customer.customerNumber}</TableCell>
//               <TableCell align="right">edit/delete</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./CustomerTable.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import RemoveButton from "./RemoveButton";

const getCustomers = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/customer", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch customers");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.customers;
  } catch (error) {
    console.log("Error loading customers: ", error);
  }
};

const CustomerTable = () => {
  const [customers, setCustomers] = React.useState([]);

  React.useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customerData = await getCustomers();
        setCustomers(customerData);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  React.useEffect(() => {
    console.log(customers);
  }, [customers]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Name
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Number
            </TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.length > 0 &&
            customers.map((customer) => (
              <TableRow
                key={customer._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {customer.customerName}
                </TableCell>
                <TableCell align="center">{customer.customerNumber}</TableCell>
                <TableCell align="center">
                  <Button variant="outlined" id="edit-button">
                    Edit
                  </Button>
                  &nbsp;
                  <RemoveButton id={customer._id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomerTable;
