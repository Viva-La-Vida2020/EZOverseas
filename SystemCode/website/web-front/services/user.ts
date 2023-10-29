import convertToStandardResponse from "../helper/methods/convertToStandardResponse";
import { EmailPasswordForm } from "../layout/components/login/login";
import { GeneralInquiryForm, UserInfoResponse } from "../sagas/handlers/user.d";

export async function requestToFetchAllUsers() {
  return await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/all`, {
    method: "GET",
    headers: {
      Authorization: localStorage.getItem("jwt") || "",
    },
  }).then((res) => {
    return res.json();
  });
}

export async function requestToFetchUser() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/currentUser`,
    {
      headers: {
        Authorization: localStorage.getItem("jwt") || "",
      },
    },
  ).then((res) => {
    return res.status === 401
      ? { success: false, message: "您还未登录。", data: null }
      : res.json();
  });
}

export async function requestToLoginByEmail(payload: EmailPasswordForm) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/login/email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToRegister(payload: any) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToFetchUserTestResults() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/test/results`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwt") || "",
      },
    },
  ).then((res) => {
    return convertToStandardResponse(res);
  });
}

export async function requestToFetchUserTestResultsById(id: string) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/test/results_by_id/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwt") || "",
      },
    },
  ).then((res) => {
    return convertToStandardResponse(res);
  });
}

export async function requestToFetchUserProgramBooking() {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/program_bookmarks`,
    {
      method: "GET",
      headers: {
        Authorization: localStorage.getItem("jwt") || "", //该方法需要先验证身份然后取数据
      },
    },
  ).then((res) => {
    return convertToStandardResponse(res);
  });
}

export async function requestToRegisterByEmail(payload: EmailPasswordForm) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/signup/email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToAuthWechat(payload: {
  code: string;
  appId: any;
  secret: any;
}) {
  return await fetch(
    `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${payload.appId}&secret=${payload.secret}&code=${payload.code}&grant_type=authorization_code`,
    {
      mode: "cors",
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      // },
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToAccessWechatUser(payload: {
  accessToken: string;
  openId: string;
}) {
  return await fetch(
    `https://api.weixin.qq.com/sns/userinfo?access_token=${payload.accessToken}}&openid=${payload.openId}`,
    {
      mode: "cors",
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      // },
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToAuthWechatOnAPI(payload: {
  code: string;
  isWechatBrowser: boolean;
  redirect: string;
}) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/login/wechat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToVerifyEmail(payload: { token: string }) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/email/verify`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("jwt") || "",
      },
      body: JSON.stringify({ ...payload }),
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToSendSmsToPhone(payload: { phone: string }) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/login/sendSms`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToAuthByPhone(payload: {
  phone: string;
  passcode: string;
}) {
  return await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/login/phone`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...payload }),
    },
  ).then((res) => {
    return res.json();
  });
}

export async function requestToSendGeneralInquiry(data: GeneralInquiryForm) {
  return await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/user/inquiry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt") || "",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    return res.json();
  });
}
