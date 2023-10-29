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
        "“The test results are incredibly accurate! As an arts student, I've always been uncertain about which major to pursue. I'm also very grateful to Tim for his informative session. He provided so much valuable information, helping me understand what studying marketing in the UK entails, and what career paths are available post-graduation. Now, I feel much more confident about my future!”",
      name: "Student ALEX",
      result: "Test Result: ENFP",
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_URL_PREFIX}/images/slider/Jenny.png`,
      content:
        "“My parents work in banking and wanted me to study something related to finance and accounting. Even though I didn't want to pursue finance, I wasn't sure which major would be right for me. Thanks to EZO's mentorship and tests, I've decided to study Urban Planning, a subject I'm truly passionate about. I'm grateful to EZO's mentors for showing me a new direction!”",
      name: "Student JENNY",
      result: "Test Result: INFJ",
    },
    {
      avatar: `${process.env.NEXT_PUBLIC_URL_PREFIX}/images/slider/Dan.png`,
      content:
        "“I never thought a test could be so precise. I realized that my logical and spatial thinking abilities are great advantages for studying engineering. The mentor matched to me, Erik, is a top-notch graduate from Cornell's Mechanical Engineering program. He offered substantial academic guidance and helped plan my future direction. I feel I've found the major that's right for me!”",
      name: "Student DAN",
      result: "Test Result: INTJ",
    },
  ];


  return (
    <Box sx={{ pt: 10, pb: 10, backgroundColor: "#f9f9f9" }}>
      <Typography variant="h4" align="center" component="h2">
        What have the students who have used the EZO service said?
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
          Start testing
        </Button>
      </div>
    </Box>
  );
};
export default Testimonials;
