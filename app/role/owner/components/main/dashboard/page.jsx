"use client"
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Grid, Paper } from "@mui/material";
import Counter from "./counter";
import Chart from "./Chart";
import ForecastChart from "./ForecastChart";

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

        const totalProfitValue = data.reportData.reduce(
          (acc, report) => acc + report.totalAmount,
          0
        );
        setTotalProfit(totalProfitValue);

        const uniqueCustomers = new Set(
          data.reportData.map((report) => report.customerName)
        );
        setCustomerCount(uniqueCustomers.size);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const forecastData = reportData.map((report, index) => {
    const pastReports = reportData.slice(0, index);
    const averageTotalAmount =
      pastReports.reduce((acc, pastReport) => acc + pastReport.totalAmount, 0) /
      (pastReports.length || 1);
      return {
        forecastDate: report.reportDate,
        forecastedAmount: averageTotalAmount,
      };
    });

    console.log("Forecast Data:", forecastData);

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

            <div style={{ margin: "20px" }} />

            <Grid item xs={12} md={8} lg={9}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <ForecastChart forecastData={forecastData} />
              </Paper>
            </Grid>
          </div>
        </div>
        <div className="bar-container">{/* Customize this section based on requirements */}</div>
      </div>
    </div>
  );
};

export default Dashboard;
