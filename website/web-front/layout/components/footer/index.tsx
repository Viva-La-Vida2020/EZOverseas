import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import Image from "next/image";
import React from "react";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <Box className={styles.footerDiv}>
      <Container style={{ width: "100%" }}>
        <Box>
          <Grid container spacing={3}>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom component="h4">
                  关于我们
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="contactFooterLink" href="#">
                    加入我们
                  </a>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="consultFooterLink" href="#">
                    导师团队
                  </a>
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom component="h4">
                  服务内容
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="aboutFooterLink" href="#">
                    选专业测试
                  </a>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="contactFooterLink" href="#">
                    AI 一对一专业科普
                  </a>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="consultFooterLink" href="#">
                    专业探索
                  </a>
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom component="h4">
                  联系我们
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="aboutFooterLink" href="#">
                    +65-8888 8888
                  </a>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a
                    id="contactFooterLink"
                    href="mailto:contact@suitntie.cn"
                  >
                    ezo@ezo.email
                  </a>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
