"use client";
import React, { useState, useEffect } from "react";
import "./ManageCustomer.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Add } from "@mui/icons-material";
// import "./CustomerTable";
// import CustomerTable from "./CustomerTable";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import RemoveButton from "./RemoveButton";
import AddCustomer from "../../components/forms/addCustomer/page";
import EditCustomerPopup from "./editButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const getCustomers = async () => {
  try {
    const res = await fetch("/api/customer", {
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

function ManageCustomer() {
  const [customers, setCustomers] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdateCustomerPopupVisible, setUpdateCustomerPopupVisible] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(customers.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, customers.length);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setUpdateCustomerPopupVisible(true); // Show the popup
  };

  const handleClose = () => {
    setUpdateCustomerPopupVisible(false); // Hide the popup
  };

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

  // Filter users based on search query
  const filteredCustomers = customers.filter((customer) =>
    customer.customerName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="manageCustomer-container">
        <div className="blue-container">
          <div className="searchContainer">
            <AddCustomer />

            <div className="searchContainer-right">
              <p style={{ fontWeight: "bold" }}>Search</p>
              <input
                type="text"
                id="searchName"
                name="customerName"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="table-container">
            <TableContainer component={Paper}>
              <Paper style={{ height: 'auto', width: "100%" }}>
                <Table
                  stickyHeader
                  aria-label="sticky table"
                  sx={{ minWidth: 600 }}
                  size="small"
                >
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
                    {filteredCustomers
                      .slice(
                        (currentPage - 1) * entriesPerPage,
                        currentPage * entriesPerPage
                      ).
                      map((customer) => (
                        <TableRow
                          key={customer._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="center" component="th" scope="row">
                            {customer.customerName}
                          </TableCell>
                          <TableCell align="center">
                            {customer.customerNumber}
                          </TableCell>
                          <TableCell className="action-cell" align="center">
                            <Button
                              id="edit-button"
                              variant="outlined"
                              onClick={() => handleEditCustomer(customer)}
                            >
                              Edit
                            </Button>
                            <RemoveButton id={customer._id} />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Paper>
            </TableContainer>
            <div className="pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                <ArrowBackIosRoundedIcon />
              </button>
              <span>{`Showing entries ${startRange}-${endRange} of ${totalPages}`}</span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <ArrowForwardIosRoundedIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <EditCustomerPopup
        isOpen={isUpdateCustomerPopupVisible}
        customer={selectedCustomer}
        onClose={handleClose}
      />
    </>
  );
}
export default ManageCustomer;
