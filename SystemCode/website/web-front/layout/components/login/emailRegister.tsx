import { yupResolver } from "@hookform/resolvers/yup";
import ErrorIcon from "@mui/icons-material/Error";
import { LoadingButton } from "@mui/lab";
import { Box, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import {
  receiveSignupResponse,
  updateUserLoading,
} from "../../../features/user/userSlice";
import { sagaActions } from "../../../sagas/actions";
import { RootState } from "../../../store";
import styles from "./login.module.css";

function EmailSignup() {
  const response: any = useSelector(
    (state: RootState) => state.user.signupResponse,
  );
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().required("请填写邮箱").email("请输入正确的邮箱格式"),
    password: yup
      .string()
      .required("请填写密码")
      .min(8, "至少8位")
      .max(20, "不超过20位")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
        "密码需包含至少一个小写字母，一个大写字母，一个数字",
      ),
    // passcode: yup.string().required("请输入验证码"),
    confirmPassword: yup
      .string()
      .required("请再一次输入密码")
      .min(8, "至少8位")
      .max(20, "不超过20位")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
        "密码需包含至少一个小写字母，一个大写字母，一个数字",
      )
      .oneOf([yup.ref("password")], "请确保两次密码输入一致"),
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    return () => {
      clearErrors();
      if (response && !response.success) {
        dispatch(receiveSignupResponse(null));
      }
    };
  }, []);

  const loading: boolean = useSelector(
    (state: RootState) => state.user.loading,
  );

  const onSubmit = (data: any) => {
    dispatch(updateUserLoading(true));
    dispatch({
      type: sagaActions.REGISTER_BY_EMAIL,
      payload: {
        email: data.email,
        password: data.password,
      },
    });
  };

  return (
    <Box sx={{ p: 1, maxWidth: 315 }}>
      <Grid container>
        <Grid item lg={12} md={12} sm={12}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ pb: 2 }}>
              <TextField
                fullWidth
                label="邮箱"
                variant="outlined"
                {...register("email", { required: true })}
                error={errors.email}
                helperText={errors.email?.message}
              />
              {/* <Button variant="contained" size="small" sx={{ mt: 1 }}>
                获取验证码
              </Button> */}
            </Box>
            {/* <Box sx={{ pb: 2 }}>
              <TextField
                sx={{ width: '50%'}}
                label="验证码"
                variant="outlined"
                placeholder="输入验证码"
                {...register("passcode", { required: true })}
                // type="password"
                error={errors.passcode}
                helperText={errors.passcode?.message}
              />
            </Box> */}
            <Box sx={{ pb: 2 }}>
              <TextField
                fullWidth
                label="密码"
                variant="outlined"
                {...register("password", {
                  required: true,
                })}
                type="password"
                error={errors.password}
                helperText={errors.password?.message}
              />
            </Box>
            <Box sx={{ pb: 2 }}>
              <TextField
                fullWidth
                label="确认密码"
                variant="outlined"
                {...register("confirmPassword", {
                  required: true,
                })}
                type="password"
                error={errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Box>
            {response && !response.success ? (
              <Box sx={{ pt: 0.5, pb: 0.5 }} color="error.main">
                <ErrorIcon fontSize="small" />
                <span className={styles.errorMsgSpan}>{response.message}</span>
              </Box>
            ) : null}
            <Box sx={{ pb: 1, textAlign: "right" }}>
              <LoadingButton
                color="primary"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
                loading={loading}
              >
                注册
              </LoadingButton>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}
export default EmailSignup;
