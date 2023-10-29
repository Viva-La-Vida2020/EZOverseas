import { yupResolver } from "@hookform/resolvers/yup";
import SendIcon from "@mui/icons-material/Send";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { Consultant } from "../../features/consult/consult.d";
import { toggleContactModal } from "../../features/consult/consultSlice";
import { sagaActions } from "../../sagas/actions";
import { RootState } from "../../store";

const ContactForm: React.FC = () => {
  const dispatch = useDispatch();
  yup.setLocale({
    number: {
      integer: "请输入整数",
    },
  });
  const schema = yup.object().shape({
    fullName: yup.string().required("这是必填项"),
    age: yup
      .number()
      .typeError("请填写正确年龄") // Implicitly required
      .min(5, "请填写正确年龄")
      .max(85, "请填写正确年龄")
      .integer(),
    cellphone: yup
      .number()
      .typeError("请填写正确手机号") // Implicitly required
      .min(12000000000, "请填写正确手机号")
      .max(19999999999, "请填写正确手机号"),
    wechatAccNo: yup.string(),
    email: yup.string().email("请填写正确的邮箱"),
    school: yup.string(),
    inquiry: yup.string().required("这是必填项").min(3, "提的问题太短了"),
  });
  const {
    register,
    control,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const selectedConsultant: Consultant | null = useSelector(
    (state: RootState) => state.consulting.selectedConsultant,
  );
  const visible: boolean = useSelector(
    (state: RootState) => state.consulting.contactFormVisible,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const inquiryResponse = useSelector(
    (state: RootState) => state.consulting.inquiryResponse,
  );
  useEffect(() => {
    reset();
    if (loading) {
      setLoading(false);
    }
  }, [visible, loading]);

  useEffect(() => {
    setLoading(false);
  }, [inquiryResponse]);

  const handleClose = (event: object, reason: string) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    dispatch(toggleContactModal({ visible: false, consultant: null }));
  };

  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch({
      type: sagaActions.SEND_CONSULTING_INQUIRY,
      payload: {
        ...data,
        customerId: userInfo && userInfo.id ? userInfo.id : null,
        tutorId: selectedConsultant ? selectedConsultant.id : 0,
      },
    });
    console.debug(data);
  };

  return (
    <Dialog open={visible} onClose={handleClose}>
      <form name="contactConsultantForm" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>
          {selectedConsultant
            ? `对${selectedConsultant.nickName || ""}
          导师有兴趣吗？`
            : "联系学长姐"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            请留下您的联系信息，我们会尽快安排导师
          </DialogContentText>
          <Grid container spacing={1}>
            <Grid item sm={6} md={6} xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="userFullName"
                label="姓名(必填)"
                type="text"
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
                id="userAge"
                label="年龄(必填)"
                type="number"
                fullWidth
                variant="standard"
                error={errors.age?.message}
                helperText={errors.age?.message || ""}
                {...register("age", { required: true })}
              />
            </Grid>
            <Grid item sm={6} md={6} xs={6}>
              <TextField
                autoFocus
                margin="dense"
                id="userPhone"
                label="手机号(必填)"
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
                id="userEmail"
                label="邮箱"
                type="text"
                fullWidth
                variant="standard"
                error={errors.email?.message}
                helperText={errors.email?.message || ""}
                {...register("email", { required: false })}
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
                {...register("school", { required: false })}
              />
            </Grid>
            <Grid item sm={12} md={12} xs={12}>
              <TextField
                autoFocus
                margin="dense"
                id="userInquiry"
                label="提问(必填)"
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
                dispatch(
                  toggleContactModal({ visible: false, consultant: null }),
                );
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
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default ContactForm;
