import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Typography } from "@mui/material";

function Chart({ data, dateRange, paymentMethod }) {
  const theme = useTheme();

  console.log("Chart Component Rendered");

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filterDataByDateRange = (data, range) => {
    return data.filter((report) => {
      const reportDate = new Date(report.reportDate);
      const currentDate = new Date();

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
          return true;
      }
    });
  };

  const filterDataByPaymentMethod = (data, method) => {
    if (method === "all") {
      return data;
    } else {
      return data.filter((report) => report.paymentMethod === method);
    }
  };

  const filteredData = filterDataByPaymentMethod(filterDataByDateRange(data, dateRange), paymentMethod);

  console.log("Filtered Data:", filteredData);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Chart
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={filteredData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="reportDate"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            tickFormatter={formatDate}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: "middle",
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Sales (₱)
            </Label>
          </YAxis>
          <Tooltip labelFormatter={(value) => formatDate(value)} />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="totalAmount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default Chart;
