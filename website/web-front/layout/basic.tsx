import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setIsPcBrowser,
  setIsWechatBrowser,
  setScreenHeight,
  setScreenWidth,
} from "../features/settings/settingSlice";
import styles from "./basicLayout.module.css";
import Footer from "./components/footer";
import NavBar from "./components/nav";

const BasicLayout: React.FC = (props: any) => {
  const dispatch = useDispatch();

  function detectWechatBrowser() {
    let ua: any = navigator.userAgent.toLowerCase();
    console.debug(ua);
    dispatch(
      setIsWechatBrowser(ua.indexOf("micromessenger") != -1 ? true : false),
    );
  }

  function handleWindowResize() {
    dispatch(setScreenWidth(window.innerWidth));
    dispatch(setScreenHeight(window.innerHeight));
    detectWechatBrowser();
  }

  function detectPcBrowser() {
    let userAgentInfo = navigator.userAgent;
    console.debug("UserAgentInfo: ", userAgentInfo);
    let Agents = [
      "Android",
      "iPhone",
      "SymbianOS",
      "Windows Phone",
      "iPad",
      "iPod",
    ];
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > -1) {
        flag = false;
        break;
      }
    }
    dispatch(setIsPcBrowser(flag));
  }
  const getAnalyticsTag = () => {
    return {
      __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?5b70ca46afc5ba4aa10407bf53807917";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();`,
    };
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    dispatch(setScreenWidth(window.innerWidth));
    dispatch(setScreenHeight(window.innerHeight));
    detectWechatBrowser();
    detectPcBrowser();
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      <Head>
        <title>EZ-Overseas 咨询</title>
        <meta name="description" content="Generated by create next app" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <script dangerouslySetInnerHTML={getAnalyticsTag()} />
        <script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
        <link rel="icon" href="/logo1.png" />
      </Head>
      <NavBar />
      <div className={styles.mainDiv}>{props.children}</div>
      <Footer />
    </>
  );
};
export default BasicLayout;
