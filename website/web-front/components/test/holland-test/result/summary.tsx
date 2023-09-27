import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

function Summary() {
  const router = useRouter();
  return (
    <Box>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ backgroundColor: "#F8F8F8", p: 5 }}>
          <Box>
            <Typography variant="h5" sx={{ pb: 2 }}>
              说在最后
            </Typography>
            <Typography variant="body1" sx={{ pb: 2 }}>
              首先，你要明白任何一个生涯决策都不是单从兴趣一个因素就能下定论的。个人的人格、气质、能力和知识技能储备也起着相当重要的作用。所以要结合自身的实际情况，综合多方面考虑才是明智的。
            </Typography>
            <Typography variant="body1" sx={{ pb: 2 }}>
              其次，不要被一次测试结果束缚住想象空间。每个人都是独一无二的，测试结果只是在统计学范围内对同类型的人作出预测，在总体方向上给你提供一些可行的建议。
            </Typography>
            <Typography variant="body1" sx={{ pb: 2 }}>
              最后，最终的选择权在你自己手上。把测试结果作为一种生涯道路上的参考但又不限于一次测试结果，才能最大地发挥测试的作用。
            </Typography>
            <Typography variant="body1" sx={{ pb: 2 }}>
              觉得测试还挺准？欢迎分享给身边的小伙伴！
            </Typography>
            <Typography variant="body1" sx={{ pb: 2 }}>
              想了解更多专业和职业信息，点击下方按钮帮你一对一匹配学长学姐！
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" onClick={() => router.push("/consult")}>
              请教学长学姐
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
export default Summary;
