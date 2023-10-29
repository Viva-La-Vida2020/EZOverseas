import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setJoinUsVisible } from "../../features/consult/consultSlice";
import { RootState } from "../../store";
import styles from "./consult.module.css";

const JoinUs: React.FC = () => {
  const dispatch = useDispatch();
  const screenWidth: number = useSelector(
    (state: RootState) => state.settings.screenWidth,
  );
  const visible: boolean = useSelector(
    (state: RootState) => state.consulting.joinUsVisible,
  );

  return (
    <Box className={styles.joinUsCard} hidden={!visible}>
      {screenWidth < 961 ? (
        <Box className={styles.closeBtn}>
          <IconButton
            aria-label="close"
            color="inherit"
            sx={{ p: 0.5 }}
            onClick={() => dispatch(setJoinUsVisible(false))}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      ) : null}
      <Box className={styles.innerDiv}>
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="subtitle1">
            加入EZO导师团队
            <br />
            线上获取优厚报酬
            <br />
            分享经验帮助他人
            <br />
            传播智慧成就自己
            <br />
          </Typography>
          <Button
            variant="contained"
            href="https://jinshuju.net/f/Q1suVd"
            target="_blank"
            rel="noopener noreferrer"
          >
            成为导师
          </Button>
        </Box>
        <Box sx={{ pt: 1 }}>
          <Image
            src={`/images/pics/consult/joinUs.png`}
            width={200}
            height={166}
            alt="join us"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default JoinUs;
