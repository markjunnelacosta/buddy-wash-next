"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import "./priceTable.css";
import EditSupplyPopup from "./editButton";
import RemoveButton from "./removeButton";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const getSupplies = async () => {
  try {
    const res = await fetch("/api/BRANCH2/branch2Supply", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supplies");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.supplies;
  } catch (error) {
    console.log("Error loading supplies: ", error);
  }
};

const SupplyTable = () => {
  const [supplies, setSupplies] = React.useState([]);
  const [selectedSupply, setSelectedSupply] = useState(null);
  const [isUpdateSupplyPopupVisible, setUpdateSupplyPopupVisible] = useState(false);
  const [entriesPerPage, setEntriesPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(supplies.length / entriesPerPage);
  const startRange = (currentPage - 1) * entriesPerPage + 1;
  const endRange = Math.min(currentPage * entriesPerPage, supplies.length);

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

  const handleEditSupply = (supply) => {
    setSelectedSupply(supply);
    setUpdateSupplyPopupVisible(true);
  };

  const handleClose = () => {
    setUpdateSupplyPopupVisible(false); // hide popup
  };

  React.useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const suppliesData = await getSupplies();
        const sortedSupplies = suppliesData.sort((a, b) =>
          a.supplyName.localeCompare(b.supplyName)
        );
        setSupplies(suppliesData);
      } catch (error) {
        console.error("Error fetching supplies:", error);
      }
    };

    fetchSupplies();
  }, []);

  React.useEffect(() => {
    console.log(supplies);
  }, [supplies]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/BRANCH2/branch2Supply", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch supply");
      }

      const response = await res.json();
      const supplies = response.userData || [];
      setSupplies(supplies); // update the supply data in component state
    } catch (error) {
      console.log("Error loading supplies: ", error);
    }
  };

  const handleSaveData = () => {
    fetchData();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Paper style={{ height: 345, width: "100%" }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            // sx={{ minWidth: 650 }}
            size="small"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Product Name
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Price
                </TableCell>
                <TableCell align="center" style={{ fontWeight: "bold" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {supplies.length > 0 &&
                supplies
                  .slice(
                    (currentPage - 1) * entriesPerPage,
                    currentPage * entriesPerPage
                  )
                  .map((supply) => (
                    <TableRow
                      key={supply._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center" component="th" scope="row">
                        {supply.supplyName}
                      </TableCell>
                      <TableCell align="center">{supply.productPrice}</TableCell>
                      <TableCell align="center">
                        <Button
                          variant="outlined"
                          id="edit-button"
                          onClick={() => handleEditSupply(supply)}
                        >
                          Edit
                        </Button>
                        <RemoveButton id={supply._id} />
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
      <EditSupplyPopup
        isOpen={isUpdateSupplyPopupVisible}
        supply={selectedSupply}
        onClose={handleClose}
        onSave={handleSaveData} // implement save function
      />
    </>
  );
};

export default SupplyTable;
