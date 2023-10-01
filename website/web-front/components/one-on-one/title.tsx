import { Box, Typography } from "@mui/material";
import React from "react";

import styles from "./oneOnOne.module.css";

const Title: React.FC = () => {
  return (
    <Box className={styles.topBanner}>
      <Box width={1}>
        <Typography variant="h3" textAlign="center">
          和 AI 聊聊
        </Typography>
      </Box>
    </Box>
  );
};
export default Title;
