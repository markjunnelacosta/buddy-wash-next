// "use client";
// import React from 'react';
// import './transactions.css';
// import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import { Add } from '@mui/icons-material';
// import DownloadIcon from '@mui/icons-material/Download';
// import AddReports from './ReportTable';

// function Transactions (){
//     return(
//         <div className="transactions-container">
//             <div className="blue-container">
           
//             <div className="searchContainer">
//                 <div className="searchContainer-left"> 
//                     <p style={{fontWeight:"bold"}}>Date From: </p>
//                     <input className="inputDate" type="text" id="dateFrom" name="dateFrom" /> 
//                     <p style={{fontWeight:"bold"}}>To: </p>
//                     <input className="inputDate" type="text" id="dateTo" name="dateTo" /> 
//                     <Button style={{backgroundColor:"white", color:"black", width:"100px", height:"40px",fontWeight:"bold", alignSelf:"flex-end", margin:"30px", borderRadius:"10px"}} variant="contained" >
//                         Filter
//                     </Button>
//                 </div>
//                 <div className="searchContainer-right">
//                 <Button style={{backgroundColor:"white", color:"black", width:"100px", height:"40px",fontWeight:"bold", alignSelf:"flex-end", margin:"30px", borderRadius:"10px"}} variant="contained" startIcon={<DownloadIcon />}>
//                     PDF
//                 </Button>
                
//                 </div>
//             </div>
//             <div className="table-container">{AddReports()}</div>
//             </div>

//         </div>
//     )
// }
// export default Transactions;