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
                  About Us
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="contactFooterLink" href="#">
                    Join Us
                  </a>
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom component="h4">
                  Our Services
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="aboutFooterLink" href="#">
                    Major Selection Test
                  </a>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="contactFooterLink" href="#">
                    AI One-on-One Major Introduction
                  </a>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="consultFooterLink" href="#">
                    Major Exploration
                  </a>
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4} md={4} sm={4} xs={12}>
              <Box sx={{ textAlign: "center" }}>
                <Typography variant="subtitle2" gutterBottom component="h4">
                  Contact Us
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="aboutFooterLink" href="#">
                    +65-8888 8888
                  </a>
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  <a id="contactFooterLink" href="mailto:contact@suitntie.cn">
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
