import { Box, Chip, Typography } from "@mui/material";
import React from "react";

interface Prop {
  tags: Array<any>;
}

const ReportTags: React.FC<Prop> = (props) => {
  const { tags } = props;
  const padding: any = {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 2,
    xl: 3,
    xxl: 3,
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        p: padding,
        borderRadius: 6,
        mt: 3,
      }}
    >
      <Typography variant="h5">你的标签:</Typography>
      {tags.map((item: any) => (
        <Chip
          key={`dimension_test_result_tag_${item.name}`}
          label={`#${item.name}`}
          sx={{ m: 0.5 }}
        />
      ))}
    </Box>
  );
};
export default ReportTags;
