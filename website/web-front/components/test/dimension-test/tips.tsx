import { Grid, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import styles from "./dimension.module.css";

const Tips: React.FC = () => {
  return (
    <div className={styles.testDesc}>
      <Grid container spacing={4} sx={{ pt: 4 }}>
        <Grid item md={4} sm={4} xs={12}>
          <div className={styles.triBlockContent}>
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/test-page/timer.svg`}
              width={41}
              height={51}
              alt="timer"
            />
            <Typography variant="body1" component="div">
              测试长度大概为20分钟，回答没有对错好坏之分。
            </Typography>
          </div>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <div className={styles.triBlockContent}>
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/test-page/heart.svg`}
              width={51}
              height={46}
              alt="heart"
            />
            <Typography variant="body1" component="div">
              请选择真实的你的做法，而不要选择你认为哪样更好。
            </Typography>
          </div>
        </Grid>
        <Grid item md={4} sm={4} xs={12}>
          <div className={styles.triBlockContent}>
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/test-page/relax.svg`}
              width={39}
              height={54}
              alt="relax"
            />
            <Typography variant="body1" component="div">
              最大程度放松下来，不假思索地选择你的倾向。
            </Typography>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default Tips;
