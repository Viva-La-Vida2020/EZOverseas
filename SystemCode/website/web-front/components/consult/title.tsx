import { Box, Typography } from "@mui/material";
import React from "react";

import styles from "./consult.module.css";

const Title: React.FC = () => {
  return (
    <Box className={styles.topBanner}>
      <Box width={1}>
        <Typography variant="h3" textAlign="center">
          导师库
        </Typography>
      </Box>
    </Box>
  );
};
export default Title;
