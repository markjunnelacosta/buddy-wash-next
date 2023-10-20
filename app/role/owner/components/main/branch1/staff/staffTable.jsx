import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./staffTable.css";
import Link from "next/link";
import Button from "@mui/material/Button";
import { blue } from "@mui/material/colors";

const getStaff = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/staff", {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch staff");
        }

        // console.log(await res.json());
        const response = await res.json();
        return response.staff;
    } catch (error) {
        console.log("Error loading staff: ", error);
    }
};

const staffTable = () => {
    const [staff, setStaff] = React.useState([]);

    React.useEffect(() => {
        const fetchStaff = async () => {
            try {
                const staffData = await getStaff();
                setStaff(staffData);
            } catch (error) {
                console.error("Error fetching staff:", error);
            }
        };

        fetchStaff();
    }, []);

    React.useEffect(() => {
        console.log(staff);
    }, [staff]);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>
                            Name
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>
                            Address
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>
                            Phone Number
                        </TableCell>
                        <TableCell align="center" style={{ fontWeight: "bold" }}>
                            Position
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
};

export default staffTable;
