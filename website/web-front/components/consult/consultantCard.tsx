import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import {
  Consultant,
  ConsultantDetails,
} from "../../features/consult/consult.d";
import { toggleContactModal } from "../../features/consult/consultSlice";
import styles from "./consult.module.css";

interface Prop {
  data: Consultant;
}
// /asset/image/photos/Maggie.png
const ConsultantCard: React.FC<Prop> = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/asset/tutors/images/${
      data.thumbnail ? data.thumbnail : ""
    }`,
  );
  const fallbackSrc: string = `/images/logo/placeholderImg.png`;

  const programList: string[] = Array.isArray(data.details)
    ? data.details.map((item: ConsultantDetails) => item.programTitle)
    : [];

  const schools: string[] = Array.isArray(data.details)
    ? data.details.map((item: ConsultantDetails) => item.schoolName)
    : [];
  console.debug(data);
  console.debug(imgSrc);

  return (
    <Card sx={{ mb: 2, p: 2, position: "relative", background: "#f8f8f8" }}>
      <Box className={styles.consultantCardDiv}>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CardContent sx={{ mr: 3 }} className={styles.nameSection}>
            {data.thumbnail ? (
              <Image
                src={imgSrc}
                alt="logo"
                className={styles.consultantPhoto}
                width={80}
                height={80}
                onError={() => {
                  setImgSrc(fallbackSrc);
                }}
              />
            ) : (
              <AccountCircleIcon sx={{ fontSize: 48 }} />
            )}
            <Typography
              variant="subtitle1"
              color="primary"
              className={styles.consultantName}
              align="center"
            >
              {data.nickName}
            </Typography>
          </CardContent>
        </Box>
        <Box>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                pb: 1,
              }}
            >
              <Box sx={{ fontWeight: "700", pr: 2 }}>专业领域</Box>
              {programList.map((item: string) => (
                <Typography
                  key={`working_field_${item}`}
                  variant="body1"
                  sx={{ pr: 2 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
            >
              <Box sx={{ fontWeight: "bold", pr: 2 }}>毕业院校</Box>
              {schools.map((item: string) => (
                <Typography
                  key={`graduated_from_${item}`}
                  variant="body1"
                  sx={{ pr: 2 }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
            <Typography variant="body1" sx={{ pt: 2 }}>
              {data.introduction}
            </Typography>
          </CardContent>
        </Box>
        <IconButton
          className={styles.contactButton}
          color="primary"
          size="large"
          aria-label="fill-in-contact-form"
          onClick={() =>
            dispatch(toggleContactModal({ visible: true, consultant: data }))
          }
        >
          <EmailIcon fontSize="inherit" />
        </IconButton>
      </Box>
    </Card>
  );
};
export default ConsultantCard;
