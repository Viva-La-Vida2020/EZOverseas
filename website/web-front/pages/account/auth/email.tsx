import ErrorIcon from "@mui/icons-material/Error";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingCard from "../../../components/loadingCard";
import { receiveVerificationResponse } from "../../../features/user/userSlice";
import { RootState } from "../../../store";

function EmailConfirmation() {
  const router = useRouter();
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const verificationResponse = useSelector(
    (state: RootState) => state.user.verificationResponse,
  );

  useEffect(() => {
    if (userInfo) {
      if (userInfo.emailVerified) {
        router.replace("/");
        return;
      }
      if (router.query && router.query.email && router.query.token) {
        dispatch({
          type: "VERIFY_EMAIL",
          payload: {
            token: router.query.token,
          },
        });
      }
    }

    return () => {
      dispatch(receiveVerificationResponse(null));
    };
  }, [userInfo, router, dispatch]);

  return (
    <Box
      sx={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      width={1}
    >
      {verificationResponse ? (
        <Box sx={{ textAlign: "center" }}>
          {verificationResponse.success ? (
            <MarkEmailReadIcon sx={{ fontSize: 40 }} color="success" />
          ) : (
            <ErrorIcon sx={{ fontSize: 40 }} color="error" />
          )}
          <Typography variant="h6">{verificationResponse.message}</Typography>
        </Box>
      ) : (
        <LoadingCard message="正在验证邮箱..." />
      )}
    </Box>
  );
}
export default EmailConfirmation;
