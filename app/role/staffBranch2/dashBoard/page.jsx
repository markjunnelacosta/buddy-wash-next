"use client"
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { Grid, Paper } from "@mui/material";
import Counter from "./Counter";
import Chart from "./Chart";
import ForecastChart from "./forecastChart";
import { Select, MenuItem } from '@mui/material';

const Dashboard = () => {
  const [reportData, setReportData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [dateRange, setDateRange] = useState("annually");
  const [paymentMethod, setPaymentMethod] = useState("all");
  // const [customerData, setCustomerData] = useState("walk-in");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/report");
        const data = await res.json();

        setReportData(data.reportData);

        const calculateDataForDateRange = (range, paymentMethod) => {
          return data.reportData
            .filter((report) => {
              const reportDate = new Date(report.reportDate);
              const currentDate = new Date();
              const isCorrectPaymentMethod = paymentMethod === "all" || report.paymentMethod === paymentMethod;

              switch (range) {
                case "daily":
                  return (
                    reportDate.getDate() === currentDate.getDate() &&
                    reportDate.getMonth() === currentDate.getMonth() &&
                    reportDate.getFullYear() === currentDate.getFullYear()
                  );
                case "weekly":
                  const firstDayOfWeek = new Date(currentDate);
                  const dayOfWeek = currentDate.getDay();
                  const diff = currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when the day is Sunday
                  firstDayOfWeek.setDate(diff);
                  return (
                    reportDate >= firstDayOfWeek && reportDate <= currentDate
                  );
                case "monthly":
                  return (
                    reportDate.getMonth() === currentDate.getMonth() &&
                    reportDate.getFullYear() === currentDate.getFullYear()
                  );
                case "annually":
                  return reportDate.getFullYear() === currentDate.getFullYear();
                case "semi-annually":
                  const halfYear = Math.floor(reportDate.getMonth() / 6);
                  const currentHalfYear = Math.floor(currentDate.getMonth() / 6);
                  return (
                    halfYear === currentHalfYear &&
                    reportDate.getFullYear() === currentDate.getFullYear()
                  );
                default:
                  return isCorrectPaymentMethod;
              }
            })
            .reduce(
              (acc, report) => {
                const isCorrectPaymentMethod =
                  paymentMethod === "all" || report.paymentMethod === paymentMethod;

                if (isCorrectPaymentMethod) {
                  acc.totalProfit += report.totalAmount;
                  acc.customerCount += 1;
                }

                if (report.paymentMethod === "GCash") {
                  acc.gcashProfit += report.totalAmount;
                } else if (report.paymentMethod === "Cash") {
                  acc.cashProfit += report.totalAmount;
                }

                return acc;
              },
              { totalProfit: 0, customerCount: 0, gcashProfit: 0, cashProfit: 0, }
            );
        };

        // const getWeekNumber = (date) => {
        //   const onejan = new Date(date.getFullYear(), 0, 1);
        //   const weekNumber = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
        //   return weekNumber;
        // };

        // Update state hooks with calculated values based on the selected date range
        const { totalProfit, customerCount, gcashProfit, cashProfit, } = calculateDataForDateRange(dateRange, paymentMethod);
        setTotalProfit(totalProfit);
        setCustomerCount(customerCount);

        console.log("GCash Profit:", gcashProfit);
        console.log("Cash Profit:", cashProfit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange, paymentMethod]);

  const lastReportDate = new Date(Math.max(...reportData.map(report => new Date(report.reportDate))));

  // Calculate future dates (4 days ahead) for forecasting
  const futureDates = Array.from({ length: 4 }, (_, index) => {
    const date = new Date(lastReportDate);
    date.setDate(lastReportDate.getDate() + index + 1); // Add 1 to skip the last date in reportData
    return date;
  });

  // Generate forecast data for the calculated future dates
  const forecastData = futureDates.map(forecastDate => {
    const pastReports = reportData;
    const averageTotalAmount =
      pastReports.reduce((acc, pastReport) => acc + pastReport.totalAmount, 0) /
      (pastReports.length || 1);

    // Introduce variability by adding a random factor
    const variabilityFactor = Math.random() * 0.2 + 0.9; // Adjust the range and factor as needed
    const forecastedAmount = averageTotalAmount * variabilityFactor;

    return {
      forecastDate: forecastDate.toLocaleDateString(),
      forecastedAmount: forecastedAmount.toFixed(2), // Adjust as needed
    };
  });

  console.log("Forecast Data:", forecastData);
  
  return (
    <div className="dashboard-container-owner">
      <div className="graphs-container">
        <div className="selects-container">
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            style={{
              backgroundColor: "white",
              color: "black",
              width: "200px",
              height: "40px",
              fontWeight: "bold",
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

          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{
              backgroundColor: "white",
              color: "black",
              width: "200px",
              height: "40px",
              fontWeight: "bold",
              borderRadius: "10px"
            }}
          >
            <MenuItem disabled>Select Payment Data</MenuItem>
            <MenuItem value="all">All Payments</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="GCash">GCash</MenuItem>
          </Select>

          {/* <Select
            value={customerData}
            onChange={(e) => setCustomerData(e.target.value)}
            style={{
              backgroundColor: "white",
              color: "black",
              width: "200px",
              height: "40px",
              fontWeight: "bold",
              borderRadius: "10px"
            }}
          >
            <MenuItem disabled>Select Customer Data</MenuItem>
            <MenuItem value="walk-in">Walk-in</MenuItem>
            <MenuItem value="mobile">Mobile</MenuItem>
          </Select> */}
        </div>
        <div className="top-container">
          <div className="counters-container">
            <Counter title="Sales" value={totalProfit.toFixed(2)} currency="₱" />
            <Counter title="Customers" value={customerCount} />
          </div>

          <div className="customers-container">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 230,
                  }}
                >
                  <Chart data={reportData} dateRange={dateRange} paymentMethod={paymentMethod} />
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 230,
                  }}
                >
                  <ForecastChart forecastData={forecastData} dateRange={dateRange} />
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