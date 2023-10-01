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
import React from "react";

const HomeSection2: React.FC = () => {
  const router = useRouter();
  return (
    <Box sx={{ pt: 5, pb: 10 }}>
      <Container>
        <Grid container spacing={6} sx={{ pt: 6 }}>
          <Grid item md={6} sm={6} xs={12}>
            <Card sx={{ backgroundColor: "#fdf7f2" }}>
              <CardContent>
                <Box sx={{ pl: 5, pr: 5, pt: 3, pb: 3, textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom component="h3">
                    Comprehensive Program Database
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    If you need to further understand the major you're interested in, EZO's professional tutor database covers 500+ outstanding and friendly senior students from renowned universities worldwide. They are willing to share their personal experiences and provide one-on-one targeted university major knowledge based on the student's individual situation.
                  </Typography>
                  <Box sx={{ pt: 3, textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={() => router.push("/programs")}
                    >
                      Browse Programs
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6} sm={6} xs={12}>
            <Card sx={{ backgroundColor: "#fdf7f2" }}>
              <CardContent>
                <Box sx={{ pl: 5, pr: 5, pt: 3, pb: 3, textAlign: "center" }}>
                  <Typography variant="h5" gutterBottom component="h3">
                    College Ranking Database
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    If you need to further understand the major you're interested in, EZO's professional tutor database covers 500+ outstanding and friendly senior students from renowned universities worldwide. They are willing to share their personal experiences and provide one-on-one targeted university major knowledge based on the student's individual situation.
                  </Typography>
                  <Box sx={{ pt: 3, textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={() => router.push("/ranking")}
                    >
                      Check Rankings
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
export default HomeSection2;
