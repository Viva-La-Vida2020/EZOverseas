import { Box, Chip, Typography } from "@mui/material";
import React from "react";

interface Prop {
  content: string;
}

const BasicAnalysis: React.FC<Prop> = (props) => {
  const { content } = props;

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        pt: 5,
        pb: 4,
        pl: 3,
        pr: 3,
        mt: 3,
      }}
    >
      <Typography variant="h4" color="#2F4858" sx={{ pb: 2 }}>
        基本分析
      </Typography>
      <Typography variant="body1" sx={{ pb: 2 }}>
        {content}
      </Typography>
    </Box>
  );
};
export default BasicAnalysis;
