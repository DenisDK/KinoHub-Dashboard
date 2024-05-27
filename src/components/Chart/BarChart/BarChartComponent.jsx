"use client";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const BarChartComponent = ({ total, watched, planned, abandoned }) => {
  return (
    <div className="bg-[#cccccc] dark:bg-[#272727] mt-5 duration-300 rounded-lg flex">
      <BarChart
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
        xAxis={[
          {
            scaleType: "band",
            data: ["Усього", "Переглянуті", "Заплановані", "Покинуті"],
          },
        ]}
        series={[
          { data: [total, watched, planned, abandoned], color: "#0593ff" },
        ]}
        //   width={800}
        height={313}
        colors={["#0593ff"]}
      />
    </div>
  );
};

export default BarChartComponent;
