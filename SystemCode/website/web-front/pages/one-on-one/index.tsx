import { Box, Container, Typography } from "@mui/material";
import React from "react";

import ChatBot from "../../components/one-on-one/chatbot";
import Title from "../../components/one-on-one/title";
// import ContactButton from "../../components/contact/contactButton";
// import Section1 from "../../components/one-on-one/section1";
// import Section2 from "../../components/one-on-one/section2";
// import Section3 from "../../components/one-on-one/section3";
// import ServiceTable from "../../components/one-on-one/serviceTable";


const OneOnOne: React.FC = () => {
  return (
    <Box>
      <Title />
      <Container>
        <ChatBot />
        {/* <Section1 /> */}
        {/* <Section2 /> */}

        {/* <ServiceTable /> */}
        {/* <Section3 /> */}
        {/* <ContactButton title="AI 一对一" /> */}
      </Container>
    </Box>
  );
};
export default OneOnOne;
