import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./pricesTable.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";
import RemoveButton from "./RemoveButton";

const getPrices = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/prices", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch prices");
        }

        // console.log(await res.json());
        const response = await res.json();
        return response.prices;
    } catch (error) {
        console.log("Error loading prices: ", error);
    }
};

const pricesTable = () => {
    const [prices, setPrices] = React.useState([]);

    React.useEffect(() => {
        const fetchPrices = async () => {
            try {
                const pricesData = await getPrices();
                setPrices(pricesData);
            } catch (error) {
                console.error("Error fetching prices:", error);
            }
        };

        fetchPrices();
    }, []);

    React.useEffect(() => {
        console.log(prices);
    }, [prices]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>
                            Product
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
                    {prices.length > 0 &&
                        prices.map((prices) => (
                            <TableRow
                                key={prices._id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {prices.productName}
                                </TableCell>
                                <TableCell align="center">{prices.productPrice}</TableCell>
                                <TableCell align="center">
                                    <Button variant="outlined" id="edit-button">
                                        Edit
                                    </Button>
                                    &nbsp;
                                    <RemoveButton id={prices._id} />
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default pricesTable;
