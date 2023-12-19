"use client";
import React, { useState, useEffect } from "react";
import "./dashboard.css";
import { Grid, Paper } from "@mui/material";
import Counter from "./counter";
import Chart from "./chart";
import ForecastChart from "./forecastChart";
import { Select, MenuItem } from '@mui/material';

const API_PATH_REPORT = "/api/report";
const API_PATH_BRANCH2 = "/api/BRANCH2/branch2Report";
const API_PATH_BRANCH3 = "/api/report";

const Dashboard = () => {
  const [reportData, setReportData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [b1Profit, setB1Profit] = useState(0);
  const [b2Profit, setB2Profit] = useState(0);
  const [b3Profit, setB3Profit] = useState(0);
  const [dateRange, setDateRange] = useState("annually");
  const [paymentMethod, setPaymentMethod] = useState("all");
  // const [customerData, setCustomerData] = useState("walk-in");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [b1Data, b2Data, b3Data] = await Promise.all([
          fetch(API_PATH_REPORT).then(res => res.json()),
          fetch(API_PATH_BRANCH2).then(res => res.json()),
          fetch(API_PATH_BRANCH3).then(res => res.json())
        ]);

        console.log("Data from API_PATH_REPORT:", b1Data.reportData);
        console.log("Data from API_PATH_BRANCH2:", b2Data.reportData);
        console.log("Data from API_PATH_BRANCH3:", b3Data.reportData);

        const allReportData = [...b1Data.reportData, ...b2Data.reportData, ...b3Data.reportData];
        setReportData(allReportData);

        console.log("Fetched Report Data:", allReportData);

        const calculateDataForDateRange = (range, paymentMethod) => { // check if allReportData is empty
          if (allReportData.length === 0) {
            return { totalProfit: 0, customerCount: 0, b1Profit: 0, b2Profit: 0, b3Profit: 0, gcashProfit: 0, cashProfit: 0 }; // handle the case when there is no report data
          }

          console.log("Original allReportData:", allReportData);

          const filteredData = allReportData
            .filter((report) => {
              const reportDate = new Date(report.reportDate);
              const currentDate = new Date();
              const isCorrectPaymentMethod = paymentMethod === "all" || report.paymentMethod === paymentMethod;
              const isCorrectApiPath = [API_PATH_REPORT, API_PATH_BRANCH2, API_PATH_BRANCH3].includes(report.apiPath);

              switch (range) {
                case "daily":
                  return (
                    reportDate.getDate() === currentDate.getDate() &&
                    reportDate.getMonth() === currentDate.getMonth() &&
                    reportDate.getFullYear() === currentDate.getFullYear() &&
                    reportDate.getHours() === currentDate.getHours()
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
                  const passFilter = isCorrectPaymentMethod && isCorrectApiPath;
                  console.log("Filtered report:", report);
                  console.log("Pass filter?", passFilter);
                  return passFilter;
              }
            });

          console.log("Filtered allReportData:", filteredData);

          const calculatedData = filteredData.reduce(
            (acc, report) => {
              const isCorrectPaymentMethod = paymentMethod === "all" || report.paymentMethod === paymentMethod;

              if (isCorrectPaymentMethod) {
                acc.totalProfit += report.totalAmount;
                acc.customerCount += 1;

                if (report.apiPath === API_PATH_REPORT) {
                  acc.b1Profit += report.totalAmount;
                } else if (report.apiPath === API_PATH_BRANCH2) {
                  acc.b2Profit += report.totalAmount;
                } else if (report.apiPath === API_PATH_BRANCH3) {
                  acc.b3Profit += report.totalAmount;
                }

                if (report.paymentMethod === "GCash") {
                  acc.gcashProfit += report.totalAmount;
                } else if (report.paymentMethod === "Cash") {
                  acc.cashProfit += report.totalAmount;
                }
              }

              return acc;
            },
            { totalProfit: 0, customerCount: 0, b1Profit: 0, b2Profit: 0, b3Profit: 0, gcashProfit: 0, cashProfit: 0, }
          );
          console.log("Calculated data:", calculatedData);

          return calculatedData;
        };

        // const getWeekNumber = (date) => {
        //   const onejan = new Date(date.getFullYear(), 0, 1);
        //   const weekNumber = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
        //   return weekNumber;
        // };

        // update state hooks with calculated values based on selected date range
        const { totalProfit, b1Profit, b2Profit, b3Profit, customerCount, gcashProfit, cashProfit, } = calculateDataForDateRange(dateRange, paymentMethod);
        console.log("Calculated Data:", { totalProfit, b1Profit, b2Profit, b3Profit, customerCount, gcashProfit, cashProfit });

        setTotalProfit(totalProfit);
        setCustomerCount(customerCount);
        setB1Profit(b1Profit);
        setB2Profit(b2Profit);
        setB3Profit(b3Profit);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange, paymentMethod]);

  if (isLoading) {
    return <p>Loading...</p>; // display loading state while fetching data
  }

  const lastReportDate = new Date(Math.max(...reportData.map(report => new Date(report.reportDate))));

  const futureDates = Array.from({ length: 4 }, (_, index) => { // calculate future dates (4 days ahead) for forecasting
    const date = new Date(lastReportDate.getTime());
    date.setDate(lastReportDate.getDate() + index + 1); // add 1 to skip last date in reportData
    return date;
  });

  const forecastData = futureDates.map(forecastDate => { // forecast data for calculated future dates
    const pastReports = reportData;
    const averageTotalAmount = pastReports.length > 0
      ? pastReports.reduce((acc, pastReport) => acc + pastReport.totalAmount, 0) / pastReports.length
      : 0;

    // introduce variability by adding random factor
    const variabilityFactor = Math.random() * 0.2 + 0.9; // adjust range and factor as needed
    const forecastedAmount = averageTotalAmount * variabilityFactor;

    console.log("Variability Factor:", variabilityFactor);
    console.log("Forecast Data:", forecastedAmount);
    console.log("Average Total Amount:", averageTotalAmount);
    console.log("Forecasted Amount:", forecastedAmount);
    console.log("Past Reports:", pastReports);
    console.log("Number of Past Reports:", pastReports.length);

    return {
      forecastDate: forecastDate.toLocaleDateString(),
      forecastedAmount: forecastedAmount.toFixed(2), // adjust as needed
    };
  });

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
        </div>

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
                  <ForecastChart forecastData={forecastData || []} dateRange={dateRange} />
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
