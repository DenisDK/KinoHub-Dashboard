"use client";
import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const uData = [240, 138, 900, 308, 800, 530, 400];
const pData = [400, 300, 200, 700, 190, 430, 950];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const LinesChartComponent = () => {
  return (
    <div className="bg-[#cccccc] dark:bg-[#272727] mt-5 duration-300 rounded-lg flex">
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
        //   width={500}
        height={313}
        series={[{ data: pData }, { data: uData }]}
        xAxis={[{ scaleType: "point", data: xLabels }]}
      />
    </div>
  );
};

export default LinesChartComponent;
