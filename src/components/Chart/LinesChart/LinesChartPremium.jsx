"use client";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const LinesChartPremium = () => {
  return (
    <LineChart
      sx={() => ({
        [`.${axisClasses.root}`]: {
          [`.${axisClasses.tick}, .${axisClasses.line}`]: {
            stroke: "#5c5c5c",
            strokeWidth: 1,
          },
          [`.${axisClasses.tickLabel}`]: {
            fill: "#807d7d",
          },
        },
      })}
      xAxis={[{ data: [0, 10, 20, 30, 40] }]}
      series={[
        {
          data: [0, 5, 5, 5, 5],
          label: "Звичайна підписка",
        },
        {
          data: [0, 5, 9, 15, 35],
          label: "Преміум підписка",
        },
      ]}
      // width={500}
      height={328}
    />
  );
};

export default LinesChartPremium;
