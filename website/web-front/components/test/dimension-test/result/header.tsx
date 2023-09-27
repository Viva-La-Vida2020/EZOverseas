import { Box, Grid, Typography } from "@mui/material";
import React from "react";

import ReportCharts from "./chart";
import styles from "./result.module.css";
import ReportTags from "./tags";

interface Prop {
  title: string;
  code: string;
  description: string;
  imgUrl: string;
  weights: Array<any>;
  tags: Array<any>;
}

const ReportHeader: React.FC<Prop> = (props) => {
  const { title, code, description, imgUrl, weights, tags } = props;
  const imageUrl: string = imgUrl;
  const padding: any = {
    xs: 2,
    sm: 2,
    md: 3,
    lg: 3,
    xl: 4,
    xxl: 4,
  };

  return (
    <Box sx={{ position: "relative", p: padding, backgroundColor: "#2F4858" }}>
      <Box className={styles.mainTitle}>
        <Typography variant="h4" sx={{ pb: 3 }}>
          {`${code} ${title}`}
        </Typography>
        <Typography variant="h6">{description}</Typography>
      </Box>

      <Box className={styles.characterImageDiv}>
        <img
          src={`/resources/asset/dimension_combination/images/${imageUrl}`}
          width={200}
          height={378}
          className={styles.characterImage}
          alt="character img"
        />
      </Box>
      <Box sx={{ position: "relative", height: { xs: 450, sm: 400 } }}>
        <Grid container justifyContent="flex-end">
          <Grid item lg={9} md={9} sm={9} xs={12}>
            <Box sx={{ position: "absolute", zIndex: 2 }}>
              <ReportCharts weights={weights} tags={tags} />
              <ReportTags tags={tags} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className={styles.headerSvg}
      >
        <polygon stroke="white" fill="white" points="0,100 100,0 100,100" />
      </svg>
    </Box>
  );
};
export default ReportHeader;
