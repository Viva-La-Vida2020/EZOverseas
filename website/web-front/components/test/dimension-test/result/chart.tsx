import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis } from "recharts";

interface Prop {
  weights: Array<any>;
  tags: Array<any>;
}

const ReportCharts: React.FC<Prop> = (props) => {
  const { weights, tags } = props;
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);

  const barChartData1 = Array.isArray(weights)
    ? weights[0].map((item: any, index: number) => {
        return {
          name: `${item["code"]} ${item["dimensionTitle"]}`,
          score: item.total,
          amt: 19,
        };
      })
    : [];
  const barChartData2 = Array.isArray(weights)
    ? weights[1].map((item: any, index: number) => {
        return {
          name: `${item["code"]} ${item["dimensionTitle"]}`,
          score: item.total,
          amt: 19,
        };
      })
    : [];
  const barChartData3 = Array.isArray(weights)
    ? weights[2].map((item: any, index: number) => {
        return {
          name: `${item["code"]} ${item["dimensionTitle"]}`,
          score: item.total,
          amt: 19,
        };
      })
    : [];
  const barChartData4 = Array.isArray(weights)
    ? weights[3].map((item: any, index: number) => {
        return {
          name: `${item["code"]} ${item["dimensionTitle"]}`,
          score: item.total,
          amt: 19,
        };
      })
    : [];

  const chartWidth: number =
    windowWidth > 1660
      ? 150
      : windowWidth > 1280
      ? 140
      : windowWidth > 1000
      ? 130
      : windowWidth > 860
      ? 120
      : windowWidth > 670
      ? 110
      : windowWidth > 600
      ? 100
      : windowWidth > 500
      ? 200
      : windowWidth > 420
      ? 150
      : windowWidth > 360
      ? 130
      : 110;

  return (
    <Paper sx={{ p: 5, backgroundColor: "#fff", borderRadius: 10 }}>
      <Grid container>
        <Grid item lg={3} md={3} sm={3} xs={6}>
          <BarChart
            width={chartWidth}
            height={130}
            data={barChartData1}
            margin={{
              right: 20,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
              dy={5}
            />
            <Bar dataKey="score" fill="#F19F4D" />
          </BarChart>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={6}>
          <BarChart
            width={chartWidth}
            height={130}
            data={barChartData2}
            margin={{
              right: 20,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
              dy={5}
            />
            <Bar dataKey="score" fill="#F19F4D" />
          </BarChart>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={6}>
          <BarChart
            width={chartWidth}
            height={130}
            data={barChartData3}
            margin={{
              right: 20,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
              dy={5}
            />

            <Bar dataKey="score" fill="#F19F4D" />
          </BarChart>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={6}>
          <BarChart
            width={chartWidth}
            height={130}
            data={barChartData4}
            margin={{
              right: 20,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
              dy={5}
            />
            <Bar dataKey="score" fill="#F19F4D" />
          </BarChart>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ReportCharts;
