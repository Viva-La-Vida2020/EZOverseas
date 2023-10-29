import { Typography } from "@mui/material";
import React from "react";

import styles from "./dimension.module.css";

const Title: React.FC = () => {
  return (
    <div className={styles.mainTitle}>
      <Typography variant="h3" gutterBottom component="h3">
        MBTI性格测试
      </Typography>
    </div>
  );
};
export default Title;
