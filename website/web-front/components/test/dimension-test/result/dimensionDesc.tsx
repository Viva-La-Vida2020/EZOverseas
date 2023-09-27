import { Box, Chip, Typography } from "@mui/material";
import React from "react";

interface Prop {
  majorDimensions: Array<any>;
}

const DimensionDesc: React.FC<Prop> = (props) => {
  const { majorDimensions } = props;

  return (
    <Box
      sx={{
        backgroundColor: "#ffffff",
        pt: 6,
        pb: 3,
        pl: 3,
        pr: 3,
        mt: 3,
      }}
    >
      <Typography variant="h4" color="#2F4858" sx={{ pb: 2 }}>
        维度解释
      </Typography>
      {majorDimensions.map((item: any) => (
        <Box key={`major_dimension_box_${item.code}`} sx={{ pb: 1 }}>
          <Typography variant="body1" sx={{ pl: 1 }}>
            <span style={{ color: "#F19F4D" }}>
              {`${item.code} ${item.dimensionTitle}:`}
            </span>{" "}
            {item.dimensionDesc}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
export default DimensionDesc;
