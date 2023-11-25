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

function Chart({ data, dateRange }) {
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
            reportDate.getFullYear() === currentDate.getFullYear()
          );
        case "weekly":
          const firstDayOfWeek = new Date();
          firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
          return reportDate >= firstDayOfWeek && reportDate <= currentDate;
        case "monthly":
          return (
            reportDate.getMonth() === currentDate.getMonth() &&
            reportDate.getFullYear() === currentDate.getFullYear()
          );
        case "annually":
          return reportDate.getFullYear() === currentDate.getFullYear();
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
    });
  };

    const filteredData = filterDataByDateRange(data, dateRange);

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
