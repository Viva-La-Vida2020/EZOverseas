import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface Prop {
  message: string;
}

const LoadingCard: React.FC<Prop> = (props) => {
  const { message } = props;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={24} sx={{ mr: 1 }} />
      <Typography sx={{ textAlign: "center", pt: 4, pb: 4 }} variant="h5">
        {message}
      </Typography>
    </Box>
  );
};
export default LoadingCard;
