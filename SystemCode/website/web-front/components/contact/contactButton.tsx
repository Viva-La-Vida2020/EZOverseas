import SendIcon from "@mui/icons-material/Send";
import { Box, Fab } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setInquiryModalVisible } from "../../features/user/userSlice";
import ContactForm from "./contactForm";

interface Prop {
  title: string;
}

const GeneralInquiryButton: React.FC<Prop> = (props) => {
  const { title } = props;
  const dispatch = useDispatch();

  return (
    <>
      <Box className="backTopButton">
        <Fab
          color="primary"
          aria-label="inquiry"
          onClick={() => dispatch(setInquiryModalVisible(true))}
        >
          <SendIcon />
        </Fab>
      </Box>
      <ContactForm title={title} />
    </>
  );
};
export default GeneralInquiryButton;
