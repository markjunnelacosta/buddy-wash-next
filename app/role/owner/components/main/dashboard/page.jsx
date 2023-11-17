"use client"

import React, { useState, useEffect } from "react";
import "./dashboard.css";
import {
  List,
  Divider,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Paper,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import Counter from "./counter";
import Chart from "./Chart";

const Dashboard = () => {
  const [reportData, setReportData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/report");
        const data = await res.json();

        setReportData(data.reportData);

        const totalProfitValue = data.reportData.reduce((acc, report) => acc + report.totalAmount, 0);
        setTotalProfit(totalProfitValue);

        const uniqueCustomers = new Set(data.reportData.map((report) => report.customerName));
        setCustomerCount(uniqueCustomers.size);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="graphs-container">
        <div className="top-container">
          <div className="counters-container">
            <Counter title="Total Profit Today" value={totalProfit.toFixed(2)} />
            <Counter title="Customers Today" value={customerCount} />
          </div>
          <div className="customers-container">
            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Chart data={reportData} />
              </Paper>
            </Grid>
          </div>
        </div>
        <div className="bar-container">
          {/* Customize this section based on requirements */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
