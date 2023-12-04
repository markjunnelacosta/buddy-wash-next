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

function ForecastChart({ forecastData, dateRange }) {
  const theme = useTheme();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filterForecastDataByDateRange = (data, range) => {
    return data.filter((forecast) => {
      const forecastDate = new Date(forecast.forecastDate);
      const currentDate = new Date();

      switch (range) {
        case "daily":
          return (
            forecastDate.getDate() === currentDate.getDate() &&
            forecastDate.getMonth() === currentDate.getMonth() &&
            forecastDate.getFullYear() === currentDate.getFullYear()
          );
        case "weekly":
          const daysSinceStartOfWeek = (currentDate.getDay() + 6) % 7; // calculate days since start of the week
          const startOfWeek = new Date(currentDate);
          startOfWeek.setDate(currentDate.getDate() - daysSinceStartOfWeek);
          const endOfWeek = new Date(startOfWeek);
          endOfWeek.setDate(startOfWeek.getDate() + 6);

          return forecastDate >= startOfWeek && forecastDate <= endOfWeek;
        case "monthly":
          return (
            forecastDate.getMonth() === currentDate.getMonth() &&
            forecastDate.getFullYear() === currentDate.getFullYear()
          );
        case "annually":
          return forecastDate.getFullYear() === currentDate.getFullYear();
        case "semi-annually":
          const halfYear = Math.floor(forecastDate.getMonth() / 6);
          const currentHalfYear = Math.floor(currentDate.getMonth() / 6);
          return (
            halfYear === currentHalfYear &&
            forecastDate.getFullYear() === currentDate.getFullYear()
          );
        default:
          return true;
      }
    });
  };

  const filteredForecastData = filterForecastDataByDateRange(forecastData, dateRange);

  console.log("Filtered Forecast Data:", filteredForecastData);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="secondary" gutterBottom>
        Forecast Chart
      </Typography>
      <ResponsiveContainer>
        <LineChart
          data={filteredForecastData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="forecastDate"
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
              Forecasted Sales (₱)
            </Label>
          </YAxis>
          <Tooltip labelFormatter={(value) => formatDate(value)} />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="forecastedAmount"
            stroke={theme.palette.secondary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

export default ForecastChart;
