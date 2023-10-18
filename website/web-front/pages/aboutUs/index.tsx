import { Box, Container, Grid, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import Title from "../../components/about/title";

//import aboutImage1 from "../../public/images/pics/about/about-img1.jpg";
//import aboutImage2 from "../../public/images/pics/about/about-img2.jpg";

const AboutUs: React.FC = () => {
  const [imageSize, setImageSize] = useState<number>(0);
  useEffect(() => {
    const imageSize: number =
      window.innerWidth > 768 ? window.innerWidth / 5 : window.innerWidth / 2;
    setImageSize(imageSize);
  }, []);

  return (
    <div>
      <Title />
      <Container>
        <Box
          sx={{ backgroundColor: "#ffffff", paddingTop: 12, paddingBottom: 12 }}
        >
          <Grid container spacing={2}>
            <Grid item lg={8} md={7} sm={12}>
              <Box sx={{ pl: 5, pt: 3, pr: 5 }}>
                <Typography variant="h4" sx={{ pb: 5 }}>
                  为什么叫Suit n&apos;Tie EZO？
                </Typography>
                <Typography variant="body1">
                  Suit n&apos;Tie (Suit and Tie的简称)
                  直译为西装与领带，是国际上正式场合的着装要求，也是长大成人的标志之一。同时Suit也有合适的意思，而Tie也有连接之意。正如我们希望的一样：让每个学生都能够用更科学的方法找到适合自己的专业方向；并帮助他们连接到理想专业的学长学姐，解决专业上的困惑，指引学术上的方向。因为我们坚信：适合自己的道路，才是最美的旅途。
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4} md={5} sm={12}>
              <Image
                src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/1-on-1/1v1.png`}
                width={imageSize}
                height={imageSize}
                layout="responsive"
                alt="about image 01"
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Box sx={{ backgroundColor: "#f4f4f4", pt: 6, pb: 6 }}>
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={4} md={5} sm={12}>
              <Box sx={{ pl: 5, pt: 3 }}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/pics/about/about-img2.jpg`}
                  width={350}
                  height={476}
                  layout="responsive"
                  alt="about image 02"
                />
              </Box>
            </Grid>
            <Grid item lg={8} md={7} sm={12}>
              <Box sx={{ pl: 5, pt: 3, pr: 5 }}>
                <Typography variant="h4" sx={{ pb: 5 }}>
                  我们的初衷
                </Typography>
                <Typography variant="body1">
                  我们是一群留学于各个国家的好朋友们，在用业余时间帮助了许多学弟学妹解决留学问题时，发现了一个很大的问题：为什么大多数学生花了大量的时间精力金钱在提高成绩，背景提升，申请学校时，却很少认真地琢磨下到底什么专业最适合自己？
                </Typography>
                <Typography variant="body1">
                  我们带着经验与思考，努力尝试着回答这个问题。我们认为比起学校的排名，找到适合自己的专业才是最重要的，因为它将会影响你的一生。而最能给你帮助的人，就是走过你这条路的人，你的学长学姐，你未来期望工作行业里的从业者们。
                </Typography>
                <Typography variant="body1">
                  于是我们成立了EZO咨询，汇聚了一帮来自世界各国各校各个专业乐于分享的年轻人，专注解决学弟学妹选专业时产生的困惑。如果你认同我们的价值观，欢迎你有一天也能成为我们的导师，薪火相传。
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
};
export default AboutUs;
