import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
//import processIcon1 from "../../public/icons/process/process_icon_Step1.png";
//import processIcon2 from "../../public/icons/process/process_icon_Step2.png";
//import processIcon3 from "../../public/icons/process/process_icon_Step3.png";
//import processIcon4 from "../../public/icons/process/process_icon_Step4.png";
import Image from "next/image";
import React from "react";

import styles from "./serviceTable.module.css";

const Section3: React.FC = () => {
  const cardPadding: any = {
    xs: 1,
    sm: 4,
    md: 3,
    lg: 3,
    xl: 3,
    xxl: 3,
  };

  return (
    <Box className={styles.section3}>
      <Typography variant="h4" align="center" gutterBottom component="h4">
        适途一对一解惑流程
      </Typography>
      <Grid container spacing={2} sx={{ pt: 5, pb: 5 }}>
        <Grid item lg={3} md={3} sm={6} xs={6}>
          <Card
            sx={{ height: "100%", p: cardPadding }}
            style={{ backgroundColor: "#f8f8f8" }}
          >
            <CardContent>
              <Box sx={{ textAlign: "center", pb: 3 }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/icons/process/process_icon_Step1.png`}
                  width={50}
                  height={50}
                  alt="process_icon_Step1"
                />
              </Box>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                component="h3"
              >
                1. 兴趣初步调查
              </Typography>
              <Typography
                variant="body2"
                align="center"
                gutterBottom
                component="p"
              >
                学生通过适途专业匹测试获取独家个人报告后，主动探索报告中最感兴趣的几个专业，并填写个人信息表。
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={6}>
          <Card
            sx={{ height: "100%", p: cardPadding }}
            style={{ backgroundColor: "#f8f8f8" }}
          >
            <CardContent>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/icons/process/process_icon_Step2.png`}
                  width={50}
                  height={50}
                  alt="process_icon_Step2"
                />
              </Box>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                component="h3"
              >
                2. 按需匹配导师
              </Typography>
              <Typography
                variant="body2"
                align="center"
                gutterBottom
                component="p"
              >
                适途咨询师根据学生信息与学生进一步沟通，挖掘学生更多潜在想法，并根据学生和家长需求安排一对一专业导师
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={6}>
          <Card
            sx={{ height: "100%", p: cardPadding }}
            style={{ backgroundColor: "#f8f8f8" }}
          >
            <CardContent>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/icons/process/process_icon_Step3.png`}
                  width={50}
                  height={50}
                  alt="process_icon_Step3"
                />
              </Box>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                component="h3"
              >
                3. 学生导师沟通
              </Typography>
              <Typography
                variant="body2"
                align="center"
                gutterBottom
                component="p"
              >
                专业导师收集适途咨询师提供的学生信息，并根据约定的时间进行正式一对一线上咨询。
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={6}>
          <Card
            sx={{ height: "100%", p: cardPadding }}
            style={{ backgroundColor: "#f8f8f8" }}
          >
            <CardContent>
              <Box sx={{ textAlign: "center", mb: 3 }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/icons/process/process_icon_Step4.png`}
                  width={50}
                  height={50}
                  alt="process_icon_Step4"
                />
              </Box>
              <Typography
                variant="h6"
                align="center"
                gutterBottom
                component="h3"
              >
                4. 定制个人报告
              </Typography>
              <Typography
                variant="body2"
                align="center"
                gutterBottom
                component="p"
              >
                适途咨询师对导师和学生以及家长进行回访，根据多方反馈整理数据并提供个性化定制报告。
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Section3;
