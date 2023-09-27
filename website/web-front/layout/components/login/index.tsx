import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, Dialog, IconButton, Tab, Tabs } from "@mui/material";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  receiveLoginError,
  toggleLoginModal,
} from "../../../features/user/userSlice";
import { RootState } from "../../../store";
import EmailLogin from "./email";
import EmailSignup from "./emailRegister";
import PhoneLogin from "./phone";
import WehcatLogin from "./wechat";
import WechatMobile from "./wechatMobile";

const LoginModal: React.FC = (props) => {
  const dispatch = useDispatch();
  const loginModalVisibility = useSelector(
    (state: RootState) => state.user.loginModalVisibility,
  );
  const [emailMode, setEmailMode] = useState<string>("login");
  const [currentTab, selectTab] = useState<number>(0);
  const isPcBrower: boolean = useSelector(
    (state: RootState) => state.settings.isPcBrowser,
  );
  const isWechatBrowser: boolean = useSelector(
    (state: RootState) => state.settings.isWechatBrowser,
  );
  const error: any = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    selectTab(isPcBrower ? 0 : 2);
  }, [isPcBrower]);

  const handleChange = (_: any, newValue: number) => {
    if (error) {
      dispatch(receiveLoginError(null));
    }
    selectTab(newValue);
  };

  return (
    <Dialog
      onClose={() => dispatch(toggleLoginModal(false))}
      open={loginModalVisibility}
    >
      <Box sx={{ p: 3 }}>
        <IconButton
          aria-label="close"
          className="closeBtn"
          onClick={() => dispatch(toggleLoginModal(false))}
        >
          <CloseIcon />
        </IconButton>
        <Box sx={{ pt: 2 }}>
          <Tabs value={currentTab} onChange={handleChange} centered>
            <Tab label="wechat" />
            <Tab label="邮箱" />
            <Tab label="手机号" />
          </Tabs>
          <Box sx={{ pt: 2 }}>
            <div
              role="tabpanel"
              hidden={currentTab !== 0}
              id={`vertical-tabpanel-1`}
              aria-labelledby={`vertical-tab-1`}
            >
              {isWechatBrowser ? <WechatMobile /> : <WehcatLogin />}
            </div>
            <div
              role="tabpanel"
              hidden={currentTab !== 1}
              id={`vertical-tabpanel-2`}
              aria-labelledby={`vertical-tab-1`}
            >
              <Box>
                <Box key="email_login_div" hidden={emailMode === "register"}>
                  <EmailLogin />
                </Box>
                <Box key="email_signup_div" hidden={emailMode !== "register"}>
                  <EmailSignup />
                </Box>
                <Box sx={{ p: 1 }}>
                  <Typography variant="body2">
                    {emailMode === "register" ? "已经是" : "还不是"}
                    我们的会员用户吗？
                  </Typography>
                  <Button
                    variant="text"
                    onClick={() =>
                      setEmailMode(
                        emailMode === "register" ? "login" : "register",
                      )
                    }
                  >
                    点击这里{emailMode === "register" ? "登录" : "注册"}
                  </Button>
                </Box>
              </Box>
            </div>
            <div
              role="tabpanel"
              hidden={currentTab !== 2}
              id={`vertical-tabpanel-3`}
              aria-labelledby={`vertical-tab-1`}
            >
              <PhoneLogin />
            </div>
          </Box>
        </Box>
      </Box>
    </Dialog>
  );
};
export default LoginModal;
