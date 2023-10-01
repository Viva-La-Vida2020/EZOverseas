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
          "How can I choose my future major?"
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
                      Step 1
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      component="p"
                      color="primary"
                      style={{ fontWeight: "700", fontSize: "20px" }}
                    >
                      <span>Who am I?</span>
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      className={styles.sectionContent}
                    >
                      EZO assessment is based on the well-known Myers-Briggs Type Indicator (MBTI), which has been deeply customized for Chinese students. It helps students understand their personality preferences from an objective and scientific perspective, and to some extent, eliminate confusion about their future and prepare for choosing the right university major.
                    </Typography>
                    <Box sx={{ textAlign: "center", pt: 2, mb: 3 }}>
                      <Button
                        color="primary"
                        variant="contained"
                        onClick={() => setModalOpen(true)}
                      >
                        Free test
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
                      Step 2
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      component="p"
                      color="primary"
                      style={{ fontWeight: "700", fontSize: "20px" }}
                    >
                      What are these majors?
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      className={styles.sectionContent}
                    >
                      The test results can provide a strong reference for individuals, but more importantly, students can actively explore these unfamiliar and unknown majors. EZO has prepared the latest overview of each major. Here, you can do what you are interested in.
                    </Typography>
                    <Box sx={{ textAlign: "center", pt: 2, mb: 3 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push("/programs")}
                      >
                        Start exploring
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
                      Step 3
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      align="center"
                      component="p"
                      color="primary"
                      style={{ fontWeight: "700", fontSize: "20px" }}
                    >
                      Can I chat with senior students?
                    </Typography>
                    <Typography
                      variant="body1"
                      align="center"
                      className={styles.sectionContent}
                    >
                      If you need to further understand the major you're interested in, EZO's professional tutor database covers 500+ outstanding and friendly senior students from renowned universities worldwide. They are willing to share their personal experiences and provide one-on-one targeted university major knowledge based on the student's individual situation.
                    </Typography>
                    <Box sx={{ textAlign: "center", pt: 2, mb: 3 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => router.push("/one-on-one")}
                      >
                        Learn More
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
