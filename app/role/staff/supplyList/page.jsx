"use client";
import React, { useState, useEffect } from "react";
import "./SupplyList.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Add } from "@mui/icons-material";
import AddSupply from "../../components/forms/addSupply/page";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircleIcon from "@mui/icons-material/Circle";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const getSupplies = async () => {
  try {
    const res = await fetch("/api/supply", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch supplies");
    }

    // console.log(await res.json());
    const response = await res.json();
    return response.supplies;
  } catch (error) {
    console.log("Error loading customers: ", error);
  }
};

function SupplyList() {
  const [supplies, setSupplies] = React.useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");
  const [availableStock, setAvailableStock] = useState();
  const [alertShown, setAlertShown] = useState(false);
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

  React.useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const suppliesData = await getSupplies();
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

  const getStatusIcon = (stock) => {
    // if (stock < 10 && !alertShown) {
    //   showAlertForSupply();
    //   setAlertShown(true);
    // }

    if (stock < 10) {
      // showAlertForSupply();
      alert("Low stock alert!");
      return <CircleIcon fontSize="smaller" style={{ color: "red" }} />;
    } else if (stock >= 10 && stock < 20) {
      return <CircleIcon fontSize="smaller" style={{ color: "yellow" }} />;
    } else {
      return <CircleIcon fontSize="smaller" style={{ color: "green" }} />;
    }
  };

  const showAlertForSupply = () => {
    alert("Low stock alert!");
  };

  const filteredSupplies = supplies.filter((supply) =>
    supply.supplyName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="supplyList-container">
      <div className="blue-container">
        {/* <Button style={{backgroundColor:"white", color:"black", width:"200px", height:"50px",fontWeight:"bold", alignSelf:"flex-end", margin:"30px", borderRadius:"10px"}} variant="contained" startIcon={<Add />}>
                  New Supply
                </Button> */}
        {/* <AddSupply /> */}
        <div className="searchContainer">
          <div className="searchContainer-right">
            <p style={{ fontWeight: "bold" }}>Search</p>
            <input
              type="text"
              id="searchSupply"
              name="supplyName"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="legend">
            <p style={{ fontWeight: "bolder", fontSize: "larger" }}>
              <span style={{ fontWeight: "bolder", fontSize: "larger" }}>
                LEGEND :
              </span>
              &nbsp; &nbsp;
              <CircleIcon fontSize="smaller" style={{ color: "green" }} />{" "}
              Plenty &nbsp; &nbsp;
              <CircleIcon fontSize="smaller" style={{ color: "yellow" }} />{" "}
              Still Available &nbsp;&nbsp;
              <CircleIcon fontSize="smaller" style={{ color: "red" }} /> Running
              Low
            </p>
          </div>
        </div>
        <div className="table-container">
          <TableContainer component={Paper}>
            {/* <Paper style={{ height: 480, width: "100%" }}> */}
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
                    Price
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Available Stock
                  </TableCell>
                  <TableCell align="center" style={{ fontWeight: "bold" }}>
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSupplies
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
                      <TableCell align="center" component="th" scope="row">
                        {supply.productPrice}
                      </TableCell>
                      <TableCell align="center">
                        {supply.availableStock}
                      </TableCell>
                      <TableCell align="center">
                        {getStatusIcon(supply.availableStock)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            {/* </Paper> */}
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
  );
}
export default SupplyList;
