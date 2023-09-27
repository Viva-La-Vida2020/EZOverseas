import { Box, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

const WechatMobile: React.FC = () => {
  const [currentUrl, setCurrentUrl] = useState<string>("");

  useEffect(() => {
    setCurrentUrl(
      encodeURI(
        `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/account/auth/wechat?redirect=` +
          window.location.href,
      ),
    );
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Button
        variant="contained"
        size="large"
        fullWidth
        href={`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx25d424c51ed0650d&redirect_uri=${currentUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`}
      >
        点击这里验证
      </Button>
    </Box>
  );
};
export default WechatMobile;
