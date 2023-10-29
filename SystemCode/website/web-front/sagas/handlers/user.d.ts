export interface UserInfo {
  fullName: string;
  age: number;
  studyAboard: boolean;
  knewSuitntieBy: string;
  email: string;
  phone: string;
  nickName: string;
  sex: string;
  city: string;
  province: string;
  country: string;
  headImg: string;
}

export interface AllUsersResponse {
  success: boolean;
  message: string;
  data: any;
}

export interface UserLoginResponse {
  success: boolean;
  message: string;
  auth_token?: string;
  data?: UserInfo;
}

export interface WechatAuthResponse {
  access_token: string;
  openid: string;
  unionid: string;
  scope: string;
  refresh_token: string;
  expires_in: string;
}

export interface UserInfoResponse {
  openid: string;
  nickname: string;
  sex: number;
  province: string;
  city: string;
  country: string;
  headimgurl: string;
  privilege: string[];
  unionid: string;
}

export interface EmailSignupResponse {
  success: boolean;
  message: string;
  auth_token?: string;
  data: {
    userInfo: UserInfo;
    emailStatus: {
      success: boolean;
      message: string;
    };
  };
}

export interface GeneralInquiryForm {
  fullName: string;
  cellphone: string;
  email: string;
  wechatAccNo: string;
  school: string;
  city: string;
  inquiry: string;
}
