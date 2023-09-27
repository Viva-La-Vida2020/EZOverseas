import { Box, Button } from "@mui/material";
import type { NextPage } from "next";

import Testmonials from "../components/home/components/homeSlider2";
import HomeSection1 from "../components/home/homeSection1";
import HomeSection2 from "../components/home/homeSection2";
import TopSlider from "../components/home/homeSlider";

const Home: NextPage = () => {
  return (
    <div>
      <main>
        <TopSlider />
        <HomeSection1 />
        <Testmonials />
        <HomeSection2 />
      </main>
    </div>
  );
};

export default Home;
