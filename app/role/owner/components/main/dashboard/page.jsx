"use client"
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Grid, Paper } from "@mui/material";
import Counter from "./counter";
import Chart from "./Chart";
import ForecastChart from "./ForecastChart";
import { Select, MenuItem } from '@mui/material';

const Dashboard = () => {
  const [reportData, setReportData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [b1Profit, setB1Profit] = useState(0);
  const [b2Profit, setB2Profit] = useState(0);
  const [b3Profit, setB3Profit] = useState(0);
  const [dateRange, setDateRange] = useState("daily");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/report");
        const data = await res.json();

        setReportData(data.reportData);

        const calculateDataForDateRange = (range) => {
          return data.reportData
            .filter((report) => {
              const reportDate = new Date(report.reportDate);
              const currentDate = new Date();

              switch (range) {
                case "daily":
                  return (
                    reportDate.getDate() === currentDate.getDate() &&
                    reportDate.getMonth() === currentDate.getMonth() &&
                    reportDate.getFullYear() === currentDate.getFullYear()
                  );
                case "weekly":
                  const firstDayOfWeek = new Date();
                  firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
                  return (
                    reportDate >= firstDayOfWeek && reportDate <= currentDate
                  );
                  break;
                case "monthly":
                  return (
                    reportDate.getMonth() === currentDate.getMonth() &&
                    reportDate.getFullYear() === currentDate.getFullYear()
                  );
                case "annually":
                  return reportDate.getFullYear() === currentDate.getFullYear();
                  break;
                case "semi-annually":
                  const halfYear = Math.ceil(reportDate.getMonth() / 6);
                  const currentHalfYear = Math.ceil(currentDate.getMonth() / 6);
                  return (
                    halfYear === currentHalfYear &&
                    reportDate.getFullYear() === currentDate.getFullYear()
                  );
                default:
                  return true;
              }
            })
            .reduce(
              (acc, report) => {
                acc.totalProfit += report.totalAmount;
                acc.customerCount += 1;
                return acc;
              },
              { totalProfit: 0, customerCount: 0 }
            );
        };

        // const getWeekNumber = (date) => {
        //   const onejan = new Date(date.getFullYear(), 0, 1);
        //   const weekNumber = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
        //   return weekNumber;
        // };

        // Update state hooks with calculated values based on the selected date range
        const { totalProfit, b1Profit, b2Profit, b3Profit, customerCount } = calculateDataForDateRange(dateRange);
        setTotalProfit(totalProfit);
        setCustomerCount(customerCount);
        setB1Profit(b1Profit("b1Amount"));
        setB2Profit(b2Profit("b2Amount"));
        setB3Profit(b3Profit("b3Amount"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange]);

  const forecastData = reportData.map((report, index) => {
    const pastReports = reportData.slice(0, index);
    const averageTotalAmount =
      pastReports.reduce((acc, pastReport) => acc + pastReport.totalAmount, 0) /
      (pastReports.length || 1);
    const forecastDate = new Date(report.reportDate);

    return {
      forecastDate: forecastDate.toLocaleDateString(),
      forecastedAmount: averageTotalAmount,
    };
  });

  console.log("Forecast Data:", forecastData);

  return (
    <div className="dashboard-container">
      <div className="graphs-container">
        <Select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          style={{
            backgroundColor: "white",
            color: "black",
            width: "200px",
            height: "40px",
            fontWeight: "bold",
            margin: "30px",
            marginLeft: "45px",
            borderRadius: "10px"
          }}
        >
          <MenuItem disabled>Select Data Period</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem value="annually">Annually</MenuItem>
          <MenuItem value="semi-annually">Semi-Annually</MenuItem>
        </Select>
        <div className="top-container">
          <div className="counters-container">
            <Counter title="Sales" value={totalProfit.toFixed(2)} currency="₱" />
            <Counter title="Customers" value={customerCount} />
            <Counter title="Branch 1 Sales" value={b1Profit.toFixed(2)} currency="₱" />
            <Counter title="Branch 2 Sales" value={b2Profit.toFixed(2)} currency="₱" />
            <Counter title="Branch 3 Sales" value={b3Profit.toFixed(2)} currency="₱" />
          </div>

          <div className="customers-container">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
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

              <Grid item xs={12} md={6}>
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
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;