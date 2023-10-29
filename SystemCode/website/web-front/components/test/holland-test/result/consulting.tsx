import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../../../store";

function Consulting() {
  const router = useRouter();
  const screenWidth = useSelector(
    (state: RootState) => state.settings.screenWidth,
  );

  return (
    <Box sx={{ pb: 4 }}>
      <Box sx={{ backgroundColor: "#FFFAF6", p: 5, position: "relative" }}>
        <Container maxWidth="md">
          <Paper elevation={0} sx={{ backgroundColor: "#FFFAF6" }}>
            <Typography
              variant="body1"
              sx={{
                pb: 2,
                pr: screenWidth > 1024 ? 40 : screenWidth > 600 ? 35 : 0,
              }}
            >
              对相关专业，大学生活和以后的工作方向有很多疑问？我们的一对一解惑服务可以帮你联系到有经验的学长学姐，为你做一对一的指导。
            </Typography>

            <Button variant="contained" onClick={() => router.push("/consult")}>
              请教学长学姐
            </Button>
          </Paper>
        </Container>
        <Box
          sx={{
            position: "absolute",
            zIndex: 3,
            top: -30,
            right: 30,
          }}
          hidden={screenWidth > 600 ? false : true}
        >
        </Box>
      </Box>
    </Box>
  );
}
export default Consulting;
