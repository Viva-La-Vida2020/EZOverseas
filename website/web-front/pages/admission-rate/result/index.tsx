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
  const { data } = props;
  const router = useRouter();
  const screenWidth = useSelector(
    (state: RootState) => state.settings.screenWidth,
  );
  const evaluationResult = useSelector(
    (state: RootState) => state.user.evaluationResult,
  );


  // generate random number from 50 to 100
  const randomNum = Math.floor(Math.random() * (100 - 50 + 1)) + 50;

  // TODO:  若 evaluationResult 能获取结果，下面的逻辑删掉。
  const [resData, setResData] = useState(randomNum);
  useEffect(() => {
    // 使用fetch发送GET请求
    fetch('api1')
      .then((response) => response.json())
      .then((responseData) => {
        // 请求成功后，将数据设置到state中
        setResData(responseData);
      })
      .catch((error) => {
        console.error('请求出错', error);
      });
  }, []); // 空数组作为第二个参数，确保该效果只在组件加载时执行一次


  return (
    <Box>
      <Box sx={{ backgroundColor: "#2F4858", p: 0 }}>
        <Container maxWidth="md">
          <Typography
            variant="h4"
            sx={{ pt: 3, pb: 4 }}
            align="center"
            color="white"
          >
            Your acceptance success rate is: {evaluationResult || resData +'%'} 
          </Typography>
        </Container>
      </Box>


      <Box sx={{ p: 10 }}>
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
                Have a lot of questions about your major, university life and future work direction? Our AI one-on-one puzzle solving service can provide you with one-on-one guidance.
              </Typography>

              <Button variant="contained" onClick={() => router.push("/one-on-one")}>
                Chat with AI
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
            <Image
              src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/test-page/holland-result-consultants.png`}
              width={310}
              height={300}
              alt="consultants"
            />
          </Box>
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
