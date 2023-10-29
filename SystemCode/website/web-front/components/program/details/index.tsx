import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  Checkbox,
  Container,
  Fab,
  Grid,
  Snackbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUserLoading } from "../../../features/user/userSlice";
import { RootState } from "../../../store";
import ContactButton from "../../contact/contactButton";
import MemberOnly from "./memberOnly";
import Profile from "./profile";
import Suitability from "./suitability";
import Testimonial from "./testimonial";

interface Prop {
  data: any;
  title: string;
}

const Details: React.FC<Prop> = (props) => {
  const { data, title } = props;
  const programId = data ? data.programId : 1;
  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const dispatch = useDispatch();
  const programBooking = useSelector(
    (state: RootState) => state.user.programBooking,
  );
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const [open, setOpen] = React.useState(false);
  var isBooked = //当前专业是否已被收藏
    programBooking &&
    programBooking.data &&
    programBooking.data.filter((item: any) => item.programId === programId)
      .length != 0;
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    dispatch(updateUserLoading(true));
    dispatch({
      type: "FETCH_PROGRAM_BOOKING",
    });
  }, [userInfo, dispatch]);

  const [checked, setChecked] = React.useState(isBooked); //收藏checkbox选中与否

  const handleBook = () => {
    setChecked(!checked);
    setOpen(true);
    if (isBooked) {
      //当前专业已收藏
      dispatch({
        type: "DELETE_PROGRAM_BOOKING",
        payload: {
          programId: programBooking.data.filter(
            (item: any) => item.programId === programId,
          )[0].programBookmarkId,
        },
      });
    } else {
      dispatch({
        type: "SUBMIT_PROGRAM_BOOKING",
        payload: {
          programId: programId,
        },
      });
    }
  };

  const padding: any = {
    xs: 2,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
  };
  return (
    <Box>
      {data ? (
        <div>
          <Container>
            <div>
              <Typography
                variant="h4"
                align="center"
                sx={{ p: padding }}
                component="h4"
                color="primary"
              >
                {title}
              </Typography>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  sx={{ width: "100%" }}
                >
                  操作成功！
                </Alert>
              </Snackbar>
            </div>
            <Profile
              info={data && Array.isArray(data.info) ? data.info : []}
              relatedPrograms={
                data && Array.isArray(data.relatedPrograms)
                  ? data.relatedPrograms
                  : []
              }
            />
            <Suitability
              info={data && Array.isArray(data.info) ? data.info : []}
              title={title}
            />
          </Container>
          <Testimonial
            data={
              data && Array.isArray(data.testimonials) ? data.testimonials : []
            }
            currentProgram={title}
          />
          <Container>
            <MemberOnly
              courses={Array.isArray(data.courses) ? data.courses : []}
              relatedPrograms={
                Array.isArray(data.relatedPrograms) ? data.relatedPrograms : []
              }
              childPrograms={
                Array.isArray(data.childPrograms) ? data.childPrograms : []
              }
              selfLearningInfo={
                Array.isArray(data.selfLearningInfo)
                  ? data.selfLearningInfo
                  : []
              }
            />
          </Container>
          <ContactButton title="没有看到你感兴趣的专业？请留言联系我们" />
          <Box className="programBookingButton">
            <Fab color="primary" aria-label="inquiry" onClick={handleBook}>
              {checked === true ? <StarIcon /> : <StarBorderIcon />}
            </Fab>
          </Box>
        </div>
      ) : (
        <div></div>
      )}
    </Box>
  );
};
export default Details;
