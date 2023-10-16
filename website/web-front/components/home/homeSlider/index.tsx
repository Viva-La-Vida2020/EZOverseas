import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import SwiperCore, { Autoplay } from "swiper";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/autoplay";
// core version + navigation, pagination modules:
import { Swiper, SwiperSlide } from "swiper/react";

import TestSelector from "../components/testSelector";
import styles from "./slider.module.css";

interface SliderData {
  id: number;
  image: string;
  title: string;
  content: string;
  link: string;
  index: number;
  type: string;
  button: string;
}

const TopSlider: React.FC = () => {
  const router = useRouter();
  SwiperCore.use([Autoplay]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const data: SliderData[] = [
    {
      id: 1,
      image: "/slider/home-slider-1.jpg",
      title: "Using a scientific methodology to select a profession that suits oneself.",
      content: "The student who took the test said, It's outrageous.",
      link: "modal",
      index: 1,
      type: "home",
      button: "Limited time free test",
    },
    {
      id: 2,
      image: "/slider/home-slider-2.jpg",
      title: "Let AI robots address your professional confusions.",
      content: "One-on-one online guidance using state-of-the-art AI robots.",
      link: "/one-on-one",
      index: 2,
      type: "home",
      button: "Communicating with AI robots",
    },
    {
      id: 3,
      image: "/slider/home-slider-3.jpg",
      title: "Learn more about majors and open up a bigger world",
      content: "Search for information in various disciplines on a large scale, ensuring comprehensive knowledge on the subject matter.",
      link: "/programs",
      index: 3,
      type: "home",
      button: "Start exploring",
    },
    {
      id: 4,
      image: "/slider/home-slider-2.jpg",
      title: "Evaluating the admission rate of desired universities.",
      content: "Obtaining the success rate of the target professional institution.",
      link: "/admission-rate",
      index: 4,
      type: "home",
      button: "Start assessment",
    },
  ];

  function handleClick(dataItem: SliderData) {
    if (dataItem.link !== "modal") {
      router.push(dataItem.link);
    } else {
      setOpen(true);
    }
  }

  return (
    <div>
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        //onSlideChange={() => console.log("slide change")}
        //onSwiper={(swiper) => console.log(swiper)}
        autoplay={{ delay: 6000 }}
        loop
      >
        {data.map((item: SliderData, index: number) => (
          <SwiperSlide key={`homeTopSliderSlice${index}`}>
            <img
              // TODO: remove hard code image prefix here
              src={`images${item.image}`}
              className={styles.sliceImage}
              // width={window.innerWidth}
              //layout="fill"
              //objectFit="cover"
              //height={400}
            />
            <div className={styles.sliceTextDiv}>
              <Typography variant="h4" gutterBottom component="div">
                {item.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom component="div">
                {item.content}
              </Typography>
              <Button
                variant="outlined"
                style={{
                  color: "#fff",
                  borderColor: "#fff",
                  marginTop: "12px",
                }}
                onClick={() => handleClick(item)}
              >
                {item.button}
              </Button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <TestSelector isVisible={open} close={handleClose} />
    </div>
  );
};
export default TopSlider;
