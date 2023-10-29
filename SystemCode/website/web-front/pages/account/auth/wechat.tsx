import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingCard from "../../../components/loadingCard";
import {
  recevieAuthResponse,
  updateUserLoading,
} from "../../../features/user/userSlice";
import { RootState } from "../../../store";

interface Message {
  type: string;
  content: string;
}

function WechatAuth() {
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  const response = useSelector((state: RootState) => state.user.authResponse);
  const loading: boolean = useSelector(
    (state: RootState) => state.user.loading,
  );
  const isWechatBrowser: boolean = useSelector(
    (state: RootState) => state.settings.isWechatBrowser,
  );

  useEffect(() => {
    // console.debug("Query", query);
    // console.debug("isWechatBrowser", isWechatBrowser);
    if (!query || !query.code || !query.state) {
      dispatch(
        recevieAuthResponse({
          success: false,
          message:
            "该次请求已过期，请查看您是否已完成验证。若未完成，请重新验证。",
        }),
      );
      return;
    }
    dispatch(updateUserLoading(true));
    dispatch({
      type: "AUTH_BY_WECHAT",
      payload: {
        code: query.code,
        isWechatBrowser,
        redirect: query.redirect,
      },
    });
    return () => {
      dispatch(recevieAuthResponse(null));
    };
  }, [query, dispatch, isWechatBrowser]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: 300,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoadingCard message="正在验证微信..." />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: 300,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      width={1}
    >
      {response ? (
        response.success ? (
          <Box sx={{ textAlign: "center" }}>
            <MarkEmailReadIcon sx={{ fontSize: 40 }} color="success" />
            <Typography variant="h6">{response.message}</Typography>
            <Button
              variant="contained"
              onClick={() => router.push(`${query.redirect}`)}
            >
              回到之前页面
            </Button>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <SentimentVeryDissatisfiedIcon
              color="error"
              sx={{ fontSize: 40 }}
            />
            <Typography variant="h6">{response.message}</Typography>
            <Button
              variant="contained"
              onClick={() => router.push(`${query.redirect}`)}
            >
              回到之前页面
            </Button>
          </Box>
        )
      ) : (
        <></>
      )}
    </Box>
  );
}
export default WechatAuth;
