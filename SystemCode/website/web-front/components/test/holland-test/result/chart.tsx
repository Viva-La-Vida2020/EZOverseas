import { Grid, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  HollandTestResultData,
  HollandTestResultDetails,
} from "../../../../features/tests/holland.d";
import { divDefaultPadding } from "../../../../helper/constants";

interface Prop {
  topScoreDetails: HollandTestResultDetails | undefined;
  data: HollandTestResultData | null;
}

const ReportCharts: React.FC<Prop> = (props) => {
  const { topScoreDetails, data } = props;
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowWidth(window.innerWidth);
    });
  }, []);
  // Sort by HollandTest result code name
  const keyOrders = ["R", "I", "A", "S", "E", "C"];
  const sortedResults =
    data && Array.isArray(data.resultDetails)
      ? [...data.resultDetails].sort(
          (a: HollandTestResultDetails, b: HollandTestResultDetails) => {
            return keyOrders.indexOf(a.code) - keyOrders.indexOf(b.code);
          },
        )
      : [];
  const radarChartData = sortedResults.map((item: any) => {
    return {
      name: item["short"],
      A: item.total,
      fullMark: topScoreDetails ? topScoreDetails.total : 30,
    };
  });

  const barChartData =
    data && Array.isArray(data.resultDetails)
      ? [...data.resultDetails]
          .sort((a, b) => b.total - a.total)
          .map((item: any, index: number) => {
            return {
              id: index + 1,
              name: item["short"],
              score: item.total,
              amt: 30,
            };
          })
      : [];

  return (
    <Paper
      sx={{ p: divDefaultPadding, backgroundColor: "#fff", borderRadius: 5 }}
    >
      <Grid container spacing={2}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart
              outerRadius={120}
              // width={600}
              height={250}
              data={radarChartData}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="name" tick={{ fontSize: 12 }} />
              {/* <PolarRadiusAxis /> */}
              <Radar
                name={data ? data.title : "default"}
                dataKey="A"
                stroke="#F19F4D"
                fill="rgba(241, 159, 77, 0.3)"
                fillOpacity={0.6}
              />
              {/* <Legend /> */}
            </RadarChart>
          </ResponsiveContainer>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} sx={{ m: "10px" }}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              width={200}
              height={180}
              layout="vertical"
              //layout="horizontal"
              data={barChartData}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 10 }}
                // interval={0}
                // dy={5}
              />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar
                dataKey="score"
                fill="#F19F4D"
                // maxBarSize={250}
                //  barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ReportCharts;
