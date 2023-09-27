import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Box, Fab } from "@mui/material";
import React from "react";

import styles from "./btt.module.css";

interface Prop {
  elementRef: any;
}

const BackToTopButton: React.FC<Prop> = (props) => {
  const { elementRef } = props;

  function backToTop() {
    window.scrollTo({
      top: parseInt(elementRef?.current.offsetTop) - 80,
      behavior: "smooth",
    });
  }

  return (
    <Box className={styles.backTopButton}>
      <Fab color="primary" aria-label="backToTop" onClick={backToTop}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Box>
  );
};
export default BackToTopButton;
