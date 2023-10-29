import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
  screenWidth: number;
  screenHeight: number;
  isWechatBrowser: boolean;
  isPcBrowser: boolean;
  inquiryFormVisible: boolean;
  inquiryResponse: any;
}

const initialState: SettingsState = {
  screenWidth: 1024,
  screenHeight: 768,
  isWechatBrowser: false,
  isPcBrowser: true,
  inquiryFormVisible: false,
  inquiryResponse: null,
};

export const settingSlice = createSlice({
  name: "settingSlice",
  initialState,
  reducers: {
    setScreenWidth(state, action) {
      return {
        ...state,
        screenWidth: action.payload,
      };
    },
    setScreenHeight(state, action) {
      return {
        ...state,
        screenHeight: action.payload,
      };
    },
    setIsWechatBrowser(state, action) {
      return {
        ...state,
        isWechatBrowser: action.payload,
      };
    },
    setIsPcBrowser(state, action) {
      return {
        ...state,
        isPcBrowser: action.payload,
      };
    },
    setInquiryFormVisible(state, action) {
      return {
        ...state,
        inquiryFormVisible: action.payload,
      };
    },
    receiveInquiryResponse(state, action) {
      return {
        ...state,
        inquiryResponse: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setScreenWidth,
  setScreenHeight,
  setIsWechatBrowser,
  setIsPcBrowser,
  setInquiryFormVisible,
  receiveInquiryResponse,
} = settingSlice.actions;

export default settingSlice.reducer;
