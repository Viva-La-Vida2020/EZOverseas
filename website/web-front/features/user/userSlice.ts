import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  userInfo: any;
  allUsers: any; //用于返回全部user数据
  loginModalVisibility: boolean;
  error: any;
  loading: boolean;
  testResults: any;
  programBooking: any;
  signupResponse: any;
  authResponse: any;
  verificationResponse: any;
  smsSendingResponse: any;
  smsButtonCooling: boolean;
  generalInquiryResponse: any;
  inquiryModalVisible: boolean;
}

const initialState: UserState = {
  userInfo: null,
  allUsers: null, //用于返回全部user数据
  loginModalVisibility: false,
  error: null,
  loading: false,
  testResults: null,
  programBooking: null,
  signupResponse: null,
  authResponse: null,
  verificationResponse: null,
  smsSendingResponse: null,
  smsButtonCooling: false,
  generalInquiryResponse: null,
  inquiryModalVisible: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    receiveUser(state, action) {
      return {
        ...state,
        userInfo: action.payload,
        loginModalVisibility: false,
        error: null,
        loading: false,
      };
    },
    receiveAllUsers(state, action) {
      console.log("receiveAllUsers: ", action);
      return {
        ...state,
        allUsers: action.payload,
      };
    },
    receiveUserError(state, action) {
      if (localStorage.getItem("jwt")) {
        localStorage.removeItem("jwt");
      }
      return {
        ...state,
        userInfo: null,
        // loginModalVisibility: true,
        //error: action.payload.error,
      };
    },
    receiveLoginError(state, action) {
      return {
        ...state,
        userInfo: null,
        loading: false,
        error: action.payload,
      };
    },
    toggleLoginModal(state, action) {
      return {
        ...state,
        loginModalVisibility: action.payload,
      };
    },
    logout(state, action) {
      if (localStorage.getItem("jwt")) {
        localStorage.removeItem("jwt");
      }
      return {
        ...state,
        userInfo: null,
        error: null,
      };
    },
    updateUserLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    receiveTestResults(state, action) {
      return {
        ...state,
        testResults: action.payload,
        loading: false,
      };
    },
    receiveProgramBooking(state, action) {
      return {
        ...state,
        programBooking: action.payload,
        loading: false,
      };
    },
    receiveSignupResponse(state, action) {
      return {
        ...state,
        signupResponse: action.payload,
        loading: false,
      };
    },
    recevieAuthResponse(state, action) {
      return {
        ...state,
        authResponse: action.payload,
      };
    },
    receiveVerificationResponse(state, action) {
      return {
        ...state,
        verificationResponse: action.payload,
      };
    },
    receiveSmsSendingResponse(state, action) {
      return {
        ...state,
        smsSendingResponse: action.payload,
      };
    },
    setSmsButtonCooling(state, action) {
      return {
        ...state,
        smsButtonCooling: action.payload,
      };
    },
    receiveGeneralInquiryResponse(state, action) {
      return {
        ...state,
        generalInquiryResponse: action.payload,
        loading: false,
      };
    },
    setInquiryModalVisible(state, action) {
      return {
        ...state,
        inquiryModalVisible: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  receiveUser,
  receiveAllUsers,
  receiveUserError,
  receiveLoginError,
  toggleLoginModal,
  logout,
  updateUserLoading,
  receiveTestResults,
  receiveProgramBooking,
  receiveSignupResponse,
  recevieAuthResponse,
  receiveVerificationResponse,
  receiveSmsSendingResponse,
  setSmsButtonCooling,
  receiveGeneralInquiryResponse,
  setInquiryModalVisible,
} = userSlice.actions;

export default userSlice.reducer;
