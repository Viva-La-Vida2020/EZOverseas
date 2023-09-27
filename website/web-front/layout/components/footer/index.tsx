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
            <Grid item lg={8} md={8} sm={12} xs={12}>
              <Grid container spacing={3}>
                <Grid item lg={4} md={4} sm={4} xs={12}>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography variant="subtitle2" gutterBottom component="h4">
                      关于我们
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      <a id="aboutFooterLink" href="#">
                        公司介绍
                      </a>
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
                        一对一专业科普
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
                        +86-13770644337
                      </a>
                    </Typography>
                    <Typography variant="caption" display="block" gutterBottom>
                      <a
                        id="contactFooterLink"
                        href="mailto:contact@suitntie.cn"
                      >
                        contact@suitntie.cn
                      </a>
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={4} md={4} sm={12}>
              <div className={styles.qrCodeDiv}>
                <Box className={styles.qrCodeBox}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/qr/zhushou.JPG`}
                    width={120}
                    height={120}
                  />
                  <Typography variant="caption" display="block" gutterBottom>
                    扫码添加小助手免费咨询
                  </Typography>
                </Box>
                <Box className={styles.qrCodeBox}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL_PREFIX}/images/qr/gongzhonghao.jpg`}
                    width={120}
                    height={120}
                  />
                  <Typography variant="caption" display="block" gutterBottom>
                    扫码关注公众号
                  </Typography>
                </Box>
              </div>
            </Grid>
          </Grid>
          <div className={styles.copyRight}>
            <Box sx={{ pt: 6, textAlign: "center" }}>
              <Typography variant="caption" display="block" gutterBottom>
                Copyright &copy; {moment().format("YYYY")}{" "}
                上海西领商务咨询有限公司
              </Typography>
              <Typography variant="caption" display="block" gutterBottom>
                {" "}
                <a href="http://beian.miit.gov.cn" target="_blank">
                  沪ICP备20008266号
                </a>
              </Typography>
            </Box>
          </div>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;
