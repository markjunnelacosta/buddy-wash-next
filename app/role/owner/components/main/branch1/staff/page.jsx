// "use client";
// import React from "react";
// import "./staff.css";
// import {
//     Button,
//     FormControl,
//     InputLabel,
//     MenuItem,
//     Select,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { Add } from "@mui/icons-material";
// import "./staffTable";
// import staffTable from "./staffTable";
// import AddStaff from "../../components/forms/addStaff";
// function staff() {
//     return (
//         <div className="staff-container">
//             <div className="blue-container">
//                 <AddCustomer />

//                 <div className="searchContainer">
//                     <div className="searchContainer-left">
//                         <p style={{ fontWeight: "bold" }}>Show</p>
//                         <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
//                             <Select id="dropdown" style={{ backgroundColor: "white" }}>
//                                 <MenuItem value="">
//                                     <em>None</em>
//                                 </MenuItem>
//                                 <MenuItem></MenuItem>
//                                 <MenuItem></MenuItem>
//                                 <MenuItem></MenuItem>
//                             </Select>
//                         </FormControl>
//                         <p style={{ fontWeight: "bold" }}>Entries</p>
//                     </div>
//                     <div className="searchContainer-right">
//                         <p style={{ fontWeight: "bold" }}>Search</p>
//                         <input type="text" id="searchName" name="staffName" />
//                     </div>
//                 </div>
//                 <div className="table-container">{staffTable()}</div>
//             </div>
//         </div>
//     );
// }
// export default staff;
