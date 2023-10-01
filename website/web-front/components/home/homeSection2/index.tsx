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
                    超全专业库
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    如需进一步了解感兴趣的专业，EZO的专业导师库涵盖了全球知名大学各类专业500+位优秀且有亲和力的学长学姐，乐于用自己的亲身经历，并结合同学的个人情况，提供一对一具有针对性的大学专业知识科普。
                  </Typography>
                  <Box sx={{ pt: 3, textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={() => router.push("/programs")}
                    >
                      浏览专业
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
                    院校排名库
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    如需进一步了解感兴趣的专业，EZO的专业导师库涵盖了全球知名大学各类专业500+位优秀且有亲和力的学长学姐，乐于用自己的亲身经历，并结合同学的个人情况，提供一对一具有针对性的大学专业知识科普。
                  </Typography>
                  <Box sx={{ pt: 3, textAlign: "center" }}>
                    <Button
                      variant="contained"
                      onClick={() => router.push("/ranking")}
                    >
                      查询排名
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
