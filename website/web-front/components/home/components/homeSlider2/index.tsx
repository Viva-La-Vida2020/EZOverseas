import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/autoplay";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./slider.module.css";

interface Prop {}

interface TestimonialItem {
  avatar: string;
  content: string;
  name: string;
  result: string;
}

const Testimonials: React.FC<Prop> = (props) => {
  const router = useRouter();
  const testimonials: TestimonialItem[] = [
    {
      avatar: `${process.env.NEXT_PUBLIC_URL_PREFIX}/images/slider/Alex.png`,
      content:
        "“测试结果真的贼准，作为文科生一直不知道以后该选什么专业，也非常感谢Tim老师的科普。太多干货了，让我在一个小时内知道了英国学市场学到底学啥，毕业以后能干嘛，现在对自己的未来有信心多了！”",
      name: "ALEX同学",
      result: "测评结果：ENFP",
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_URL_PREFIX}/images/slider/Jenny.png`,
      content:
        "“我父母因为在银行工作，所以想让我也去读会计金融之类的专业，虽然我不想读金融，但是我也不知道有什么专业更适合我，通过EZO的导师和测试，我选定了自己心仪的城市规划专业。感谢EZO的导师给我打开了新的大门！”",
      name: "JENNY同学",
      result: "测评结果：INFJ",
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_URL_PREFIX}/images/slider/Dan.png`,
      content:
        "“没想到一个测试可以这么准，我意识到我的逻辑思维能力和空间思维能力是一个学工程很好的优势。给我匹配的Erik导师就是康奈尔机械工程毕业的大牛，给了我很多学术指导和发展方向的规划，我觉得我找到了适合自己的专业了！”",
      name: "DAN同学",
      result: "测评结果：INTJ",
    },
  ];

  return (
    <Box sx={{ pt: 10, pb: 10, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" align="center" component="h2">
        使用了EZO服务的同学们都说了啥？
      </Typography>
      <Container>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          //onSlideChange={() => console.log("slide change")}
          //onSwiper={(swiper) => console.log(swiper)}
          autoplay={{ delay: 15000 }}
          loop
        >
          {testimonials.map((item: TestimonialItem, index: number) => (
            <SwiperSlide key={`homeTestimonialSwiperSlide${index}`}>
              <div className={styles.sliceDiv}>
                <Image
                  src={item.avatar}
                  width={90}
                  height={90}
                  alt={`home_testimonial_slider_${index}`}
                />
                <Typography
                  variant="body1"
                  gutterBottom
                  component="p"
                  style={{
                    marginTop: "12px",
                  }}
                >
                  {item.content}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="p">
                  {item.name}
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="p">
                  {item.result}
                </Typography>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
      <div style={{ textAlign: "center" }}>
        <Button
          variant="contained"
          onClick={() => router.push("/tests/dimension-test")}
        >
          开始测试
        </Button>
      </div>
    </Box>
  );
};
export default Testimonials;
