import { Box, Typography } from "@mui/material";
import React from "react";

interface Prop {
  message: string;
  icon: any;
}

const MessageCard: React.FC<Prop> = (props) => {
  const { message, icon } = props;
  return (
    <Box sx={{ textAlign: "center", pt: 2 }}>
      {icon}
      <Typography sx={{ textAlign: "center", pt: 1, pb: 4 }} variant="h6">
        {message}
      </Typography>
    </Box>
  );
};
export default MessageCard;
