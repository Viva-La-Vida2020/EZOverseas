import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

import TestSelector from "../components/testSelector";
import styles from "./section.module.css";

const HomeSection1: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const router = useRouter();

  function handleClose() {
    setModalOpen(false);
  }

  return (
    <Box sx={{ pt: 10, pb: 10 }}>
      <Box>
        <Typography variant="h4" align="center" gutterBottom component="h2">
          “我该如何选择未来的专业？”
        </Typography>
      </Box>
      <Box>
        <Container>
          <Grid container spacing={6} sx={{ pt: 4 }} alignItems="stretch">
            <Grid item md={4} sm={4} xs={12}>
              <div className={styles.boxStyle}>
                <Card sx={{ height: "100%" }}>
                  <CardContent sx={{ pt: 5 }}>
                    <Typography
                      variant="h5"
                      align="center"
                      gutterBottom
                      component="h3"
                    >
                      第一步
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      component="p"
                      color="primary"
                      style={{ fontWeight: "700", fontSize: "20px" }}
                    >
                      <span>我是谁？</span>
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      className={styles.sectionContent}
                    >
                      EZO评测基于著名的迈尔斯里格斯(MBTI)类型指标，为中国学生重新进行了深度定制，帮助学生从客观的角度更加科学地了解自己的性格偏好，从一定程度上消除对未来的迷茫感，为选择大学专业方向做好准备。
                    </Typography>
                    <Box sx={{ textAlign: "center", pt: 2, mb: 3 }}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setModalOpen(true)}
                      >
                        免费测试
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item md={4} sm={4} xs={12}>
              <div className={styles.boxStyle}>
                <Card sx={{ height: "100%" }}>
                  <CardContent sx={{ pt: 5 }}>
                    <Typography
                      variant="h5"
                      align="center"
                      gutterBottom
                      component="h3"
                    >
                      第二步
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      component="p"
                      color="primary"
                      style={{ fontWeight: "700", fontSize: "20px" }}
                    >
                      这些专业是啥？
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      className={styles.sectionContent}
                    >
                      测试结果可以为个人提供有力参考，但更重要的是同学们可以积极主动地去探索这些陌生和未知的专业。EZO为大家准备了各专业最新概况。在这里你可以针对感兴趣的专业做到心里有数。
                    </Typography>
                    <Box sx={{ textAlign: "center", pt: 2, mb: 3 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push("/programs")}
                      >
                        开始探索
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            </Grid>
            <Grid item md={4} sm={4} xs={12}>
              <div className={styles.boxStyle}>
                <Card sx={{ height: "100%" }}>
                  <CardContent sx={{ pt: 5 }}>
                    <Typography
                      variant="h5"
                      align="center"
                      gutterBottom
                      component="h3"
                    >
                      第三步
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      component="p"
                      color="primary"
                      style={{ fontWeight: "700", fontSize: "20px" }}
                    >
                      能和学长姐聊聊吗？
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      className={styles.sectionContent}
                    >
                      如需进一步了解感兴趣的专业，EZO的专业导师库涵盖了全球知名大学各类专业500+位优秀且有亲和力的学长学姐，乐于用自己的亲身经历，并结合同学的个人情况，提供一对一具有针对性的大学专业知识科普。
                    </Typography>
                    <Box sx={{ textAlign: "center", pt: 2, mb: 3 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push("/one-on-one")}
                      >
                        了解更多
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <TestSelector isVisible={isModalOpen} close={handleClose} />
    </Box>
  );
};
export default HomeSection1;
