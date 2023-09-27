import { Typography } from "@mui/material";
import React from "react";

import styles from "./programExplore.module.css";

const Title: React.FC = () => {
  return (
    <div className={styles.topBanner}>
      <Typography variant="h3" component="h3">
        专业探索
      </Typography>
    </div>
  );
};
export default Title;
