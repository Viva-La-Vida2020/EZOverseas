import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

import Clock from "./clock";
import styles from "./progress.module.css";

interface Prop {
  answered: number;
  total: number;
  fixed: boolean;
}

const ProgressBar: React.FC<Prop> = (props) => {
  const { answered, total, fixed } = props;
  const [isProgressbarStickTop, setProgressBarStickTop] =
    useState<boolean>(false);

  function handleScroll(e: any) {
    let scrollTop: number = e.srcElement.body.scrollTop;
    setProgressBarStickTop(fixed || scrollTop > 300);
  }

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setProgressBarStickTop(fixed || window.scrollY > 300);
    });
  }, []);

  console.debug(isProgressbarStickTop);

  return (
    <Box
      className={styles.bar}
      sx={{
        position: isProgressbarStickTop ? "fixed" : "relative",
        top: isProgressbarStickTop ? 48 : "default",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "center", pb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center" }} width={0.6}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              color="primary"
              variant="determinate"
              value={parseInt(Math.round((answered / total) * 100).toString())}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.red">{`${parseInt(
              Math.round((answered / total) * 100).toString(),
            )}%`}</Typography>
          </Box>
        </Box>
        <Clock />
      </Box>
    </Box>
  );
};
export default ProgressBar;
