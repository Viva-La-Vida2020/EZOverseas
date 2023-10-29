import { Box, Typography } from "@mui/material";
import React from "react";

import styles from "./admission-rate.module.css";

const Title: React.FC = () => {
  return (
    <Box className={styles.topBanner}>
      <Box width={1}>
        <Typography variant="h3" textAlign="center">
          Admission Rate Evaluation
        </Typography>
      </Box>
    </Box>
  );
};
export default Title;
