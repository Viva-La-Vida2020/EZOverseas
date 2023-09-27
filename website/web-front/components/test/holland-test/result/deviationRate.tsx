import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Box, Typography } from "@mui/material";
import React from "react";

import {
  deviationMeasureList,
  sectionPaddingBottom,
  sectionPaddingTop,
} from "../../../../helper/constants";
import styles from "../holland.module.css";

interface Prop {
  rate: number;
}

const DeviationRate: React.FC<Prop> = (props) => {
  const { rate } = props;

  const measurePoint: number | undefined = deviationMeasureList.findIndex(
    (item) => rate <= item,
  );

  return (
    <Box
      sx={{
        pt: sectionPaddingTop,
        pb: sectionPaddingBottom,
        textAlign: "center",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h6" color="white">
          你的清晰度指数为：
        </Typography>
        <Typography variant="h5" color="primary">
          {rate ? rate.toFixed(2) : ""}
        </Typography>
      </Box>
      <Box position="relative" sx={{ pt: 4 }}>
        <Box
          className={styles.measurePointDiv}
          sx={{
            left: measurePoint ? `${(measurePoint * 7.7).toString()}%` : 0,
          }}
        >
          <ArrowDownwardIcon color="primary" fontSize="large" />
        </Box>
        <img
          src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/test-page/deviationChart.png`}
          className={styles.deviationMeasure}
          alt="deviationChart"
        />
      </Box>
      <Typography variant="body1" color="white">
        清晰度高的人，能相对更清楚地知道自己的偏好和能力，在选择将来就读专业和选择职业方面会较为清晰和稳定。而清晰度低的人，会在面临选择时会觉得茫然或者纠结。
      </Typography>
    </Box>
  );
};
export default DeviationRate;
