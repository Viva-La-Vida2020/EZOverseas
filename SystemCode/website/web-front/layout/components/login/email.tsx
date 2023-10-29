import { yupResolver } from "@hookform/resolvers/yup";
import ErrorIcon from "@mui/icons-material/Error";
import { LoadingButton } from "@mui/lab";
import { Box, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import {
  receiveSignupResponse,
  toggleLoginModal,
  updateUserLoading,
} from "../../../features/user/userSlice";
import { sagaActions } from "../../../sagas/actions";
import { RootState } from "../../../store";
import styles from "./login.module.css";

interface Prop {}

const EmailLogin: React.FC<Prop> = (props) => {
  const error: any = useSelector((state: RootState) => state.user.error);

  const dispatch = useDispatch();

  const schema = yup.object().shape({
    email: yup.string().required("请填写邮箱").email(),
    password: yup.string().required("请填写密码"),
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
    };
  }, []);

  const loading: boolean = useSelector(
    (state: RootState) => state.user.loading,
  );

  const onSubmit = (data: any) => {
    dispatch(updateUserLoading(true));
    dispatch({ type: sagaActions.LOGIN_BY_EMAIL, payload: data });
  };

  return (
    <Box sx={{ p: 1 }}>
      <Grid container>
        <Grid item lg={12} md={12} sm={12} xs={12}>
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
            </Box>
            <Box sx={{ pb: 2 }}>
              <TextField
                fullWidth
                label="密码"
                variant="outlined"
                {...register("password", { required: true })}
                type="password"
                error={errors.password}
                helperText={errors.password?.message}
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
export default EmailLogin;
