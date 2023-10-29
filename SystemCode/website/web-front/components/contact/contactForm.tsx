import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import {
  receiveGeneralInquiryResponse,
  setInquiryModalVisible,
} from "../../features/user/userSlice";
import { sagaActions } from "../../sagas/actions";
import { RootState } from "../../store";

interface Prop {
  title: string;
}

const ContactForm: React.FC<Prop> = (props) => {
  const { title } = props;
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    fullName: yup.string().max(128, "超过字数限制").required("这是必填项"),
    cellphone: yup.string().max(24, "超过字数限制").required("这是必填项"),
    wechatAccNo: yup.string().max(128, "超过字数限制"),
    city: yup.string().max(128, "超过字数限制").required("这是必填项"),
    email: yup
      .string()
      .max(128, "超过字数限制")
      .email("请填写正确的邮箱")
      .required("这是必填项"),
    school: yup.string().max(128, "超过字数限制").required("这是必填项"),
    inquiry: yup.string().max(2500, "超过字数限制").required("这是必填项"),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const visible: boolean = useSelector(
    (state: RootState) => state.user.inquiryModalVisible,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const inquiryResponse = useSelector(
    (state: RootState) => state.user.generalInquiryResponse,
  );
  useEffect(() => {
    reset();
    if (loading) {
      setLoading(false);
    }
    if (inquiryResponse) {
      dispatch(receiveGeneralInquiryResponse(null));
    }
  }, [visible, dispatch]);

  useEffect(() => {
    if (inquiryResponse && loading) {
      setLoading(false);
    }
  }, [inquiryResponse, loading]);

  const handleClose = (event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    dispatch(setInquiryModalVisible(false));
  };

  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch({
      type: sagaActions.SEND_GENERAL_INQUIRY,
      payload: {
        ...data,
        customerId: userInfo && userInfo.id ? userInfo.id : null,
      },
    });
  };

  return (
    <Dialog open={visible} onClose={handleClose}>
      <form name="contactConsultantForm" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item sm={6} md={6} xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="userFullName"
                label="姓名"
                type="text"
                maxLength={3}
                fullWidth
                error={errors.fullName?.message}
                helperText={errors.fullName?.message || ""}
                variant="standard"
                {...register("fullName", { required: true })}
              />
            </Grid>
            <Grid item sm={6} md={6} xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="userEmail"
                label="邮箱"
                type="text"
                fullWidth
                variant="standard"
                error={errors.email?.message}
                helperText={errors.email?.message || ""}
                {...register("email", { required: true })}
              />
            </Grid>
            <Grid item sm={6} md={6} xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="userPhone"
                label="手机号"
                type="text"
                fullWidth
                error={errors.cellphone?.message}
                helperText={errors.cellphone?.message || ""}
                variant="standard"
                {...register("cellphone", { required: true })}
              />
            </Grid>
            <Grid item sm={6} md={6} xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="userWechat"
                label="微信号"
                type="text"
                fullWidth
                variant="standard"
                {...register("wechatAccNo", { required: false })}
              />
            </Grid>
            <Grid item sm={6} md={6} xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="userCity"
                label="所在城市"
                maxLength={10}
                type="text"
                fullWidth
                variant="standard"
                error={errors.city?.message}
                helperText={errors.city?.message || ""}
                {...register("city", { required: true })}
              />
            </Grid>
            <Grid item sm={6} md={6} xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="userSchool"
                label="所在学校"
                type="text"
                fullWidth
                variant="standard"
                error={errors.school?.message}
                helperText={errors.school?.message || ""}
                {...register("school", { required: true })}
              />
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="userInquiry"
                label="提问"
                type="text"
                fullWidth
                multiline
                rows={4}
                variant="standard"
                error={errors.inquiry?.message}
                helperText={errors.inquiry?.message || ""}
                {...register("inquiry", { required: true })}
              />
            </Grid>
          </Grid>
          <Box sx={{ pt: 1, textAlign: "right" }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(setInquiryModalVisible(false));
              }}
              sx={{ mr: 1 }}
            >
              关闭
            </Button>
            <LoadingButton
              loading={loading}
              loadingPosition="start"
              variant="contained"
              startIcon={<SendIcon />}
              onClick={handleSubmit(onSubmit)}
            >
              提交信息
            </LoadingButton>
          </Box>
          {inquiryResponse ? (
            <Box sx={{ pt: 2 }}>
              <Alert
                severity={inquiryResponse.success ? "success" : "warning"}
                onClose={() => {
                  console.log("close");
                  dispatch(setInquiryModalVisible(false));
                }}
              >
                {inquiryResponse.message}
              </Alert>
            </Box>
          ) : null}
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default ContactForm;
