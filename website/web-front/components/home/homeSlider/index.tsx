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
      title: "用科学的方法选择适合自己的专业",
      content: "做过测试的同学说: “这准得令人发指。”",
      link: "modal",
      index: 1,
      type: "home",
      button: "限时免费测试",
    },
    {
      id: 2,
      image: "/slider/home-slider-2.jpg",
      title: "让 AI 机器人 解决你对专业的困惑",
      content: "用最先进的 AI 机器人一对一在线解惑",
      link: "/one-on-one",
      index: 2,
      type: "home",
      button: "与 AI机器人 进行沟通",
    },
    {
      id: 3,
      image: "/slider/home-slider-3.jpg",
      title: "了解更多专业，打开更大的世界",
      content: "搜索海量各个专业的信息，做到心里有数",
      link: "/programs",
      index: 3,
      type: "home",
      button: "开始探索",
    },
    {
      id: 4,
      image: "/slider/home-slider-2.jpg",
      title: "评估对心仪院校的录取率",
      content: "获取目标专业院校的成功率",
      link: "/acceptance-rate",
      index: 4,
      type: "home",
      button: "开始评估",
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
