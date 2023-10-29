import { Box, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React from "react";

interface Prop {
  message: string;
}

const LoadingCard: React.FC<Prop> = (props) => {
  const { message } = props;

  return (
    <Box>
      <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <CircularProgress color="primary" />
        <Typography variant="h4" sx={{ pl: 2 }}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
};
export default LoadingCard;
