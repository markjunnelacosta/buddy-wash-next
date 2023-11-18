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
  const [b1Profit, setB1Profit] = useState(0);
  const [b2Profit, setB2Profit] = useState(0);
  const [b3Profit, setB3Profit] = useState(0);

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

        const b1ProfitValue = data.reportData.reduce(
          (acc, report) => acc + report.b1Amount,
          0
        );
        console.log("B1 Profit:", b1ProfitValue);
        setB1Profit(b1ProfitValue);

        const b2ProfitValue = data.reportData.reduce(
          (acc, report) => acc + report.b2Amount,
          0
        );
        console.log("B2 Profit:", b2ProfitValue);
        setB2Profit(b2ProfitValue);

        const b3ProfitValue = data.reportData.reduce(
          (acc, report) => acc + report.b3Amount,
          0
        );
        console.log("B3 Profit:", b3ProfitValue);
        setB3Profit(b3ProfitValue);
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
          <div className="counters-container1">
            <Counter title="B1 Profit Today" value={b1Profit.toFixed(2)} />
            <Counter title="B2 Profit Today" value={b2Profit.toFixed(2)} />
            <Counter title="B3 Profit Today" value={b3Profit.toFixed(2)} />
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