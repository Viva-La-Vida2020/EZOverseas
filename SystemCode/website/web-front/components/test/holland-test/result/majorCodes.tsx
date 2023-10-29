import { Box, Container, Typography } from "@mui/material";
import React from "react";

import { sectionPaddingTop } from "../../../../helper/constants";

interface Prop {
  majorCodes: Array<any>;
}

const CodeDesc: React.FC<Prop> = (props) => {
  const { majorCodes } = props;

  const titlePrefix: string[] = [
    "你的主要类型：",
    "你的次要类型：",
    "你的第三类型：",
  ];

  const opacity: number[] = [1, 0.7, 0.4];

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          backgroundColor: "#ffffff",
          pt: sectionPaddingTop,
          pb: 5,
        }}
      >
        {majorCodes.map((item: any, index: number) => (
          <Box
            sx={{
              pb: 1,
              pl: 1,
              mb: 2,
            }}
            key={`holland_result_code_desc_box_${index}`}
          >
            <Box sx={{ display: "flex" }}>
              <Box sx={{ width: "13%" }}>
                <Typography
                  align="center"
                  component="div"
                  variant="h1"
                  sx={{
                    color: `rgba(241, 159, 77, ${opacity[index]})`,
                    fontSize: { xs: "24px", sm: "60px", md: "96px" },
                  }}
                  style={{ fontWeight: "500" }}
                >
                  {item.code}
                </Typography>
              </Box>
              <Box sx={{ width: "87%" }}>
                <Typography variant="h6" sx={{ pb: 1, pl: 2.5 }}>
                  {titlePrefix[index]} {item.name}
                </Typography>
                <Typography variant="body1" sx={{ pl: 2.5 }}>
                  {item.description}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
};
export default CodeDesc;
