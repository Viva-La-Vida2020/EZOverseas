import { yupResolver } from "@hookform/resolvers/yup";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import SendToMobileIcon from "@mui/icons-material/SendToMobile";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Grid, IconButton, InputAdornment } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import {
  receiveSmsSendingResponse,
  setSmsButtonCooling,
  toggleLoginModal,
  updateUserLoading,
} from "../../../features/user/userSlice";
import { RootState } from "../../../store";
import SmsButtonText from "./components/phone/SmsButtonText";
import styles from "./login.module.css";

const PhoneLogin: React.FC = () => {
  const error: any = useSelector((state: RootState) => state.user.error);
  const smsSendingResponse = useSelector(
    (state: RootState) => state.user.smsSendingResponse,
  );
  const loading: boolean = useSelector(
    (state: RootState) => state.user.loading,
  );
  const smsButtonCooling: boolean = useSelector(
    (state: RootState) => state.user.smsButtonCooling,
  );
  const [passCodeLoadingStatus, setPassCodeLoadingStatus] =
    useState<boolean>(false);
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    phone: yup.string().required("请填写手机号"),
    passcode: yup.string().required("请填写验证码"),
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    getValues,
    setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    return () => {
      clearErrors();
    };
  }, []);

  const onSubmit = (data: any) => {
    dispatch(updateUserLoading(true));
    dispatch({ type: "AUTH_BY_PHONE", payload: data });
  };

  useEffect(() => {
    if (smsSendingResponse && passCodeLoadingStatus) {
      setPassCodeLoadingStatus(false);
    }
  }, [smsSendingResponse]);

  const sendSms = () => {
    const phone = getValues("phone");
    if (!phone || phone.length !== 11 || isNaN(parseInt(phone))) {
      setError("phone", {
        type: "manual",
        message: "请先输入正确的手机号",
      });
      return;
    }
    setPassCodeLoadingStatus(true);
    console.debug(phone);
    dispatch(setSmsButtonCooling(true));
    dispatch({
      type: "SEND_SMS_TO_PHONE",
      payload: { phone },
    });
    clearErrors("phone");
  };

  return (
    <Box sx={{ p: 1 }}>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ pb: 2 }}>
              <TextField
                fullWidth
                label="手机号"
                variant="outlined"
                {...register("phone", { required: true })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">+ 86</InputAdornment>
                  ),
                }}
                error={errors.phone}
                helperText={errors.phone?.message}
              />
              <LoadingButton
                variant="contained"
                size="small"
                sx={{ mt: 1 }}
                onClick={sendSms}
                loadingPosition="start"
                startIcon={<SendToMobileIcon />}
                loading={passCodeLoadingStatus}
                disabled={smsButtonCooling}
              >
                {smsButtonCooling ? <SmsButtonText /> : "获取验证码"}
              </LoadingButton>
              {smsSendingResponse ? (
                <Alert
                  sx={{ mt: 1 }}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        dispatch(receiveSmsSendingResponse(null));
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  severity={smsSendingResponse.success ? "success" : "warning"}
                >
                  {smsSendingResponse.message}
                </Alert>
              ) : null}
            </Box>
            <Box sx={{ pb: 2 }}>
              <TextField
                sx={{ width: "50%" }}
                label="验证码"
                variant="outlined"
                placeholder="输入验证码"
                {...register("passcode", { required: true })}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                error={errors.passcode}
                helperText={errors.passcode?.message}
              />
            </Box>
            {error ? (
              <Box sx={{ pt: 0.5, pb: 0.5 }} color="error.main">
                <ErrorIcon fontSize="small" />
                <span className={styles.errorMsgSpan}>{error.message}</span>
              </Box>
            ) : null}
            <Box sx={{ pb: 1, textAlign: "right" }}>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => dispatch(toggleLoginModal(false))}
                style={{ marginRight: 3 }}
              >
                取消
              </Button>
              <LoadingButton
                color="primary"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                loadingPosition="start"
                startIcon={<CheckIcon />}
                loading={loading}
              >
                登录
              </LoadingButton>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};
export default PhoneLogin;
