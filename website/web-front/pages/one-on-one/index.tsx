import { Box, Container, Typography } from "@mui/material";
import React from "react";

import ContactButton from "../../components/contact/contactButton";
import Section1 from "../../components/one-on-one/section1";
import Section2 from "../../components/one-on-one/section2";
import Section3 from "../../components/one-on-one/section3";
import ChatBot from "../../components/one-on-one/chatbot";
import ServiceTable from "../../components/one-on-one/serviceTable";
import Title from "../../components/one-on-one/title";

const OneOnOne: React.FC = () => {
  return (
    <Box>
      <Title />
      <Container>
        {/* <Section1 /> */}
        {/* <Section2 /> */}
        <ChatBot />
        {/* <ServiceTable /> */}
        {/* <Section3 /> */}
        {/* <ContactButton title="AI 一对一" /> */}
      </Container>
    </Box>
  );
};
export default OneOnOne;
