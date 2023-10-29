import { yupResolver } from "@hookform/resolvers/yup";
import SearchIcon from "@mui/icons-material/Search";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

import { OnEditAnswer } from "../../features/tests/holland";
import mockData from "../../mock/dimensionTestMock1";

interface Prop {
  answers: OnEditAnswer[];
}

const ContactForm: React.FC<Prop> = (props) => {
  const answers = props.answers;

  const dispatch = useDispatch();
  const plans = [
    {
      value: "准备出国读书",
      label: "准备出国读书",
    },
    {
      value: "准备在国内读书",
      label: "准备在国内读书",
    },
    {
      value: "就做着玩玩",
      label: "就做着玩玩",
    },
  ];

  const sources = [
    {
      value: "微信公众号",
      label: "微信公众号",
    },
    {
      value: "知乎",
      label: "知乎",
    },
    {
      value: "朋友推荐",
      label: "朋友推荐",
    },
    {
      value: "线下讲座",
      label: "线下讲座",
    },
    {
      value: "B站",
      label: "B站",
    },
    {
      value: "抖音",
      label: "抖音",
    },
    {
      value: "小红书",
      label: "小红书",
    },
  ];

  const [loading, setLoading] = useState<boolean>(false);

  yup.setLocale({
    number: {
      integer: "请输入整数",
    },
  });
  const schema = yup.object().shape({
    userName: yup.string().required("这是必填项"),
    age: yup
      .number()
      .typeError("请填写正确年龄") // Implicitly required
      .min(5, "请填写正确年龄")
      .max(85, "请填写正确年龄")
      .integer(),
    phoneNumber: yup
      .number()
      .typeError("请填写正确手机号") // Implicitly required
      .min(12000000000, "请填写正确手机号")
      .max(19999999999, "请填写正确手机号"),
    reason: yup.string().required("这是必填项"),
    source: yup.string().required("这是必填项"),
  });

  const {
    register,
    control,
    handleSubmit,
    resetField,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    setLoading(true);
    dispatch({
      type: "SUBMIT_HOLLAND_TEST_AND_SEND_EMAIL",
      payload: {
        ...data,
        OnEditAnswers: answers,
      },
    });
    console.debug(data);
  };

  return (
    <Box>
      <DialogTitle>填写信息</DialogTitle>
      <DialogContent>
        <DialogContentText>
          为给您更好的后续服务，请留下一些信息吧~
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
              error={errors.userName?.message}
              helperText={errors.userName?.message || ""}
              variant="standard"
              {...register("userName", { required: true })}
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
              error={errors.phoneNumber?.message}
              helperText={errors.phoneNumber?.message || ""}
              variant="standard"
              {...register("phoneNumber", { required: true })}
            />
          </Grid>
          <Grid item sm={6} md={6} xs={6}></Grid>
          <Grid item sm={6} md={6} xs={6}>
            <TextField
              select
              label="我目前"
              type="text"
              fullWidth
              error={errors.reason?.message}
              helperText={errors.reason?.message || ""}
              defaultValue=""
              {...register("reason", { required: true })}
            >
              {plans.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item sm={6} md={6} xs={6}>
            <TextField
              select
              label="从哪里知道我们"
              type="text"
              fullWidth
              error={errors.source?.message}
              helperText={errors.source?.message || ""}
              defaultValue=""
              {...register("source", { required: true })}
            >
              {sources.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Box sx={{ pt: 1, textAlign: "right" }}>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSubmit(onSubmit)}
            sx={{ mr: 1 }}
          >
            查看结果
          </LoadingButton>
        </Box>
      </DialogContent>
    </Box>
  );
};
export default ContactForm;
