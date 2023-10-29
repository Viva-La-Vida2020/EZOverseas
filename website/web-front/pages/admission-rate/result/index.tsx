import { Box, Container, Typography,Paper,Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";


interface Prop {
  data: any;
}

function AdmissionResult(props: Prop) {
  const router = useRouter();
  const screenWidth = useSelector(
    (state: RootState) => state.settings.screenWidth,
  ); 
  // method1
  const { rate } = router.query
  console.log('rate', rate);
  
  // method 2
  // let result = 0;
  // if (typeof window !== 'undefined') {
  //   // 可以安全地使用localStorage和sessionStorage
  //   result = sessionStorage.getItem('result');
  // }
  // const [resData, setResData] = useState(result);
  // console.log('resData', resData);
  //
  //
  // useEffect(() => {
  //   const result = sessionStorage.getItem('result') || 0;
  //   setResData(Number(result));
  // });


  return (
    <Box>
      <Box sx={{ backgroundColor: "#2F4858", p: 5 }}>
        <Container maxWidth="md" >
          <Typography
            variant="h4"
            sx={{ pt: 3, pb: 4 }}
            align="center"
            color="white"
          >
            {/* method2 */}
            {/*Your acceptance success rate is: {resData} % */}
            {/* method1 */}
             Your acceptance success rate is: {rate} %
          </Typography>
        </Container>
      </Box>


      <Box sx={{ p: 10 }}>
        <Box sx={{ backgroundColor: "#FFFAF6", p: 5, position: "relative" }}>
          <Container maxWidth="md">
            <Paper elevation={0} sx={{ backgroundColor: "#FFFAF6", p: 5 }}>
              <Typography
                variant="body1"
                sx={{
                  pb: 2,
                }}
              >
                Have a lot of questions about your major, university life and future work direction? Our AI one-on-one puzzle solving service can provide you with one-on-one guidance.
              </Typography>

              <Button variant="contained" onClick={() => router.push("/one-on-one")}>
                Chat with AI
              </Button>
            </Paper>
          </Container>
        </Box>
      </Box>
      
      {/* summary */}
      <Box>
        <Box sx={{ backgroundColor: "#F8F8F8", p: 5, position: "relative"}}>
          <Container maxWidth="md">
            <Paper elevation={0} sx={{ backgroundColor: "#F8F8F8", p: 5 }}>
              <Box>
                <Typography variant="h5" sx={{ pb: 2 }}>
                  To conclude
                </Typography>
                <Typography variant="body1" sx={{ pb: 2 }}>
                Do not let the result of a single test restrict your imagination. Everyone is unique, and test results only predict patterns among people of the same type within a statistical range, providing you with some possible suggestions in a general direction.
                </Typography>
                <Typography variant="body1" sx={{ pb: 2 }}>
                Finally, the ultimate decision lies in your own hands. Use the test results as a reference for your career path, but do not limit yourself to just one test result in order to maximize the potential of the test.
                </Typography>
                <Typography variant="body1" sx={{ pb: 2 }}>
                  To learn more about professional and career information, click the button below for personalized AI assistance.
                </Typography>
              </Box>
              <Box>
                <Button variant="contained" onClick={() => router.push("/one-one-one")}>
                  Chat with AI
                </Button>
              </Box>
            </Paper>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}
export default AdmissionResult;
