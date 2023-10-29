import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";

function WechatLogin(props) {
  useEffect(() => {
    const obj = new WxLogin({
      id: "wechatQRContainer", //div的id
      appid: `${process.env.NEXT_PUBLIC_WECHAT_WEB_APPID}`,
      scope: "snsapi_login", //写死
      redirect_uri: encodeURI(
        `${process.env.NEXT_PUBLIC_HOST_SERVER_URL}/account/auth/wechat?redirect=` +
          window.location.href,
      ),
      state: "wechatLogin",
      style: "black", //二维码黑白风格
      href: "",
    });
  }, []);
  return (
    <Box sx={{ textAlign: "center" }}>
      <div id="wechatQRContainer"></div>
    </Box>
  );
}
export default WechatLogin;
//code=0711Ifll2BW1G847H8ml2Gv3VE01Ifls&state=wechatLogin
