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
  const [typeOfCustomer, setTypeOfCustomer] = useState("both");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/report");
        const data = await res.json();

        setReportData(data.reportData);

        const calculateDataForDateRange = (range, paymentMethod, typeOfCustomer) => {
          return data.reportData
            .filter((report) => {
              const reportDate = new Date(report.reportDate);
              const currentDate = new Date();
              const isCorrectPaymentMethod = paymentMethod === "all" || report.paymentMethod === paymentMethod;
              const isCorrectTypeOfCustomer = typeOfCustomer === "both" || report.typeOfCustomer === typeOfCustomer;

              switch (range) {
                case "daily":
                  return (
                    reportDate.getDate() === currentDate.getDate() &&
                    reportDate.getMonth() === currentDate.getMonth() &&
                    reportDate.getFullYear() === currentDate.getFullYear()
                  );
                case "weekly":
                  const daysSinceStartOfWeek = (currentDate.getDay() + 6) % 7; // calculate days since start of the week
                  const startOfWeek = new Date(currentDate);
                  startOfWeek.setDate(currentDate.getDate() - daysSinceStartOfWeek);
                  const endOfWeek = new Date(startOfWeek);
                  endOfWeek.setDate(startOfWeek.getDate() + 6);

                  return reportDate >= startOfWeek && reportDate <= endOfWeek;
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
                  return isCorrectPaymentMethod && isCorrectTypeOfCustomer;
              }
            })
            .reduce(
              (acc, report) => {
                const isCorrectPaymentMethod = paymentMethod === "all" || report.paymentMethod === paymentMethod;
                const isCorrectTypeOfCustomer = typeOfCustomer === "both" || report.typeOfCustomer === typeOfCustomer;

                if (isCorrectPaymentMethod && isCorrectTypeOfCustomer) {
                  acc.totalProfit += report.totalAmount;
                  acc.customerCount += 1;
                }

                if (report.paymentMethod === "GCash") {
                  acc.gcashProfit += report.totalAmount;
                } else if (report.paymentMethod === "Cash") {
                  acc.cashProfit += report.totalAmount;
                } else if (report.paymentMethod === "Maya") {
                  acc.mayaProfit += report.totalAmount;
                }

                return acc;
              },
              { totalProfit: 0, customerCount: 0, mayaProfit: 0, gcashProfit: 0, cashProfit: 0, }
            );
        };

        // const getWeekNumber = (date) => {
        //   const onejan = new Date(date.getFullYear(), 0, 1);
        //   const weekNumber = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
        //   return weekNumber;
        // };

        // Update state hooks with calculated values based on the selected date range
        const { totalProfit, customerCount, gcashProfit, cashProfit, } = calculateDataForDateRange(dateRange, paymentMethod, typeOfCustomer);
        console.log("Calculated Data:", { totalProfit, customerCount, gcashProfit, cashProfit });

        setTotalProfit(totalProfit);
        setCustomerCount(customerCount);

        console.log("GCash Profit:", gcashProfit);
        console.log("Cash Profit:", cashProfit);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange, paymentMethod, typeOfCustomer]);

  const lastReportDate = new Date(Math.max(...reportData.map(report => new Date(report.reportDate))));

  // calculate future dates (4 days ahead) for forecasting
  const futureDates = Array.from({ length: 4 }, (_, index) => {
    const date = new Date(lastReportDate);
    date.setDate(lastReportDate.getDate() + index + 1); // add 1 to skip the last date in reportData
    return date;
  });

  // generate forecast data for the calculated future dates
  const forecastData = futureDates.map(forecastDate => {
    const pastReports = reportData;
    const averageTotalAmount = pastReports.length > 0
      ? pastReports.reduce((acc, pastReport) => acc + pastReport.totalAmount, 0) / pastReports.length
      : 0;

    // introduce variability by adding a random factor
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
            <MenuItem value="Maya">Maya</MenuItem>
          </Select>

          <Select
            value={typeOfCustomer}
            onChange={(e) => setTypeOfCustomer(e.target.value)}
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
            <MenuItem value="both">All Customers</MenuItem>
            <MenuItem value="Walk in">Walk-in</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
          </Select>

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
                  <Chart data={reportData} dateRange={dateRange} paymentMethod={paymentMethod} typeOfCustomer={typeOfCustomer} />
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
                  <ForecastChart forecastData={forecastData} dateRange={dateRange} paymentMethod={paymentMethod} typeOfCustomer={typeOfCustomer} />
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