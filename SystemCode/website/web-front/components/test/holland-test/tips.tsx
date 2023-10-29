import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../store";
import styles from "./holland.module.css";

const Tips: React.FC = () => {
  const screenWidth: number = useSelector(
    (state: RootState) => state.settings.screenWidth,
  );
  const padding: any = {
    xs: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  };

  return (
    <div>
      <Box sx={{ pt: 6, pb: 2 }}>
        <Typography variant="h5" align="center" component="h2">
          请务必阅读以下4点后再进行测试！
        </Typography>
      </Box>
      <Box>
        <Grid container spacing={3} sx={{ pt: 4 }}>
          <Grid item md={3} sm={3} xs={6}>
            <Box
              className={styles.triBlockContent}
              sx={{
                p: padding,
                height: "100%",
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/test-page/timer.svg`}
                width={41}
                height={51}
                alt="timer"
              />
              <Typography variant="body1" component="div" sx={{ pt: 2 }}>
                测试一共90题，大概需要15-20分钟
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3} sm={3} xs={6}>
            <Box
              className={styles.triBlockContent}
              sx={{
                p: padding,
                height: "100%",
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/test-page/vector.svg`}
                width={47}
                height={47}
                alt="vector"
              />
              <Typography variant="body1" component="div" sx={{ pt: 2 }}>
                任何选项没有对错好坏之分
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3} sm={3} xs={6}>
            <Box
              className={styles.triBlockContent}
              sx={{
                p: padding,
                height: "100%",
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/test-page/relax.svg`}
                width={39}
                height={54}
                alt="relax"
              />
              <Typography variant="body1" component="div" sx={{ pt: 2 }}>
                请调整到最放松的状态答题
              </Typography>
            </Box>
          </Grid>
          <Grid item md={3} sm={3} xs={6}>
            <Box
              className={styles.triBlockContent}
              sx={{
                p: padding,
                height: "100%",
              }}
            >
              <Image
                src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/test-page/heart.svg`}
                width={51}
                height={46}
                alt="heart"
              />
              <Typography variant="body1" component="div" sx={{ pt: 2 }}>
                凭直觉回答，不要打入想象中的自己
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default Tips;
