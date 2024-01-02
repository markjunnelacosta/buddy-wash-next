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
const API_PATH_BRANCH3 = "/api/BRANCH3/branch3Report";

const Dashboard = () => {
  const [reportData, setReportData] = useState([]);
  const [totalProfit, setTotalProfit] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [branch1Sales, setBranch1Sales] = useState(0);
  const [branch2Sales, setBranch2Sales] = useState(0);
  const [branch3Sales, setBranch3Sales] = useState(0);
  const [dateRange, setDateRange] = useState("annually");
  const [paymentMethod, setPaymentMethod] = useState("all");
  const [typeOfCustomer, setTypeOfCustomer] = useState("both");
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

        const calculateBranchSales = (branchData, setBranchSalesSetter, dateRange, paymentMethod, typeOfCustomer) => {
          const branchTotal = branchData.reportData.reduce((acc, report) => {
            const reportDate = new Date(report.reportDate);
            const currentDate = new Date();
            const isCorrectPaymentMethod = paymentMethod === "all" || report.paymentMethod === paymentMethod;
            const isCorrectTypeOfCustomer = typeOfCustomer === "both" || report.typeOfCustomer === typeOfCustomer;

            const isCorrectDateRange = (() => {
              switch (dateRange) {
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
                  return true;
              }
            })();

            return isCorrectPaymentMethod && isCorrectTypeOfCustomer && isCorrectDateRange ? acc + report.totalAmount : acc;
          }, 0);

          setBranchSalesSetter(branchTotal);
        };

        calculateBranchSales(b1Data, setBranch1Sales, dateRange, paymentMethod, typeOfCustomer);
        calculateBranchSales(b2Data, setBranch2Sales, dateRange, paymentMethod, typeOfCustomer);
        calculateBranchSales(b3Data, setBranch3Sales, dateRange, paymentMethod. typeOfCustomer);

        const calculateDataForDateRange = (range, paymentMethod, typeOfCustomer) => { // check if allReportData is empty
          if (allReportData.length === 0) {
            return { totalProfit: 0, customerCount: 0, branch1Sales: 0, branch2Sales: 0, branch3Sales: 0, mayaProfit: 0, gcashProfit: 0, cashProfit: 0 }; // handle the case when there is no report data
          }

          console.log("Original allReportData:", allReportData);

          const filteredData = allReportData
            .filter((report) => {
              const reportDate = new Date(report.reportDate);
              const currentDate = new Date();
              const isCorrectPaymentMethod = paymentMethod === "all" || report.paymentMethod === paymentMethod;
              const isCorrectTypeOfCustomer = typeOfCustomer === "both" || report.typeOfCustomer === typeOfCustomer;
              const isCorrectApiPath = [API_PATH_REPORT, API_PATH_BRANCH2, API_PATH_BRANCH3].includes(report.apiPath);

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
                  const passFilter = isCorrectPaymentMethod && isCorrectApiPath && isCorrectTypeOfCustomer;
                  console.log("Filtered report:", report);
                  console.log("Pass filter?", passFilter);
                  return passFilter;
              }
            });

          console.log("Filtered allReportData:", filteredData);

          const calculatedData = filteredData.reduce(
            (acc, report) => {
              const isCorrectPaymentMethod = paymentMethod === "all" || report.paymentMethod === paymentMethod;
              const isCorrectTypeOfCustomer = typeOfCustomer === "both" || report.typeOfCustomer === typeOfCustomer;

              if (isCorrectPaymentMethod && isCorrectTypeOfCustomer) {
                acc.totalProfit += report.totalAmount;
                acc.customerCount += 1;

                if (report.apiPath === API_PATH_REPORT) {
                  acc.branch1Sales += report.totalAmount;
                } else if (report.apiPath === API_PATH_BRANCH2) {
                  acc.branch2Sales += report.totalAmount;
                } else if (report.apiPath === API_PATH_BRANCH3) {
                  acc.branch3Sales += report.totalAmount;
                }

                if (report.paymentMethod === "GCash") {
                  acc.gcashProfit += report.totalAmount;
                } else if (report.paymentMethod === "Cash") {
                  acc.cashProfit += report.totalAmount;
                } else if (report.paymentMethod === "Maya") {
                  acc.mayaProfit += report.totalAmount;
                }
              }

              return acc;
            },
            { totalProfit: 0, customerCount: 0, branch1Sales: 0, branch2Sales: 0, branch3Sales: 0, mayaProfit: 0, gcashProfit: 0, cashProfit: 0, }
          );

          return calculatedData;
        };

        // const getWeekNumber = (date) => {
        //   const onejan = new Date(date.getFullYear(), 0, 1);
        //   const weekNumber = Math.ceil(((date - onejan) / 86400000 + onejan.getDay() + 1) / 7);
        //   return weekNumber;
        // };

        // update state hooks with calculated values based on selected date range
        const { totalProfit, customerCount, mayaProfit, gcashProfit, cashProfit, } = calculateDataForDateRange(dateRange, paymentMethod, typeOfCustomer);
        console.log("Calculated Data:", { totalProfit, customerCount, mayaProfit, gcashProfit, cashProfit });

        setTotalProfit(totalProfit);
        setCustomerCount(customerCount);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dateRange, paymentMethod, typeOfCustomer]);

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
    console.log("Average Total Amount:", averageTotalAmount);
    console.log("Forecasted Amount:", forecastedAmount);
    console.log("Past Reports:", pastReports);
    console.log("Number of Past Reports:", pastReports.length);

    return {
      forecastDate: forecastDate.toLocaleDateString(),
      forecastedAmount: forecastedAmount.toFixed(2), // adjust as needed
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
            <MenuItem value="Walk in">Walk in</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
          </Select>

        </div>

        <div className="top-container">
          <div className="counters-container">
            <Counter title="Sales" value={totalProfit.toFixed(2)} currency="₱" />
            <Counter title="Customers" value={customerCount} />
            <Counter title="Branch 1 Sales" value={branch1Sales.toFixed(2)} currency="₱" />
            <Counter title="Branch 2 Sales" value={branch2Sales.toFixed(2)} currency="₱" />
            <Counter title="Branch 3 Sales" value={branch3Sales.toFixed(2)} currency="₱" />
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
