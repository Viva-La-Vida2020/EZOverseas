import { Box, Grid, Typography } from "@mui/material";
//import imageUrl from "../../public/images/pics/1-on-1/1v1.png";
import Image from "next/image";
import React from "react";

import { sectionPaddingTop } from "../../helper/constants";

const Section2: React.FC = () => {
  return (
    <Box sx={{ pt: sectionPaddingTop }}>
      <Grid container spacing={2} sx={{ pt: 5, pb: 5, ml: 4, mr: 4 }}>
        <Grid item lg={8} md={8} sm={8}>
          <Typography variant="h4" align="left" gutterBottom>
            为什么要一对一？
          </Typography>
          <Typography variant="body1" component="p">
            固然，互联网上关于不同专业的信息不计其数，从百度百科到知乎回答再到科普类博主。但是不同性格，兴趣，价值观，家庭背景都造就了独一无二的你。对于独立个体，教育不应该是灌输信息，也不因该是娱乐节目；教育是互动，是激励。而最具有针对性的方法就是一对一的沟通。
          </Typography>
        </Grid>
        <Grid item lg={4} md={4} sm={4}>
          <Box sx={{ textAlign: "right" }}>
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/1-on-1/1v1.png`}
              width={300}
              height={300}
              alt="1v1"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Section2;
