import { createSlice } from "@reduxjs/toolkit";
import lodash from "lodash";

import { HollandTestResult, ResultResponse } from "./holland.d";

export interface TestState {
  questions: Array<any>;
  currentAnswers: Array<any>;
  currentPage: number;
  resultResponse: ResultResponse | null;
  error: any;
  loading: boolean;
  testResult: HollandTestResult;
}

const initialState: TestState = {
  questions: [],
  currentAnswers: [],
  currentPage: 0,
  resultResponse: null,
  loading: false,
  testResult: {
    success: false,
    message: "",
    status: 0,
    data: null,
  },
  error: null,
};

export const hollandTestSlice = createSlice({
  name: "hollandTest",
  initialState,
  reducers: {
    toggleLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    receiveHollandTestingData(state, action) {
      const { success, data, message } = action.payload;
      return {
        ...state,
        questions: success
          ? data && data.details && Array.isArray(data.details)
            ? lodash.shuffle(data.details)
            : []
          : [],
        error: !success
          ? {
              message,
            }
          : null,
      };
    },
    updateCurrentAnswers(state, action) {
      return {
        ...state,
        currentAnswers: [...state.currentAnswers].concat(action.payload),
        currentPage: state.currentPage + 1,
      };
    },
    receiveHollandTestResponse(state, action) {
      return {
        ...state,
        resultResponse: action.payload
          ? action.payload
          : {
              success: false,
              message: "服务器无法处理该请求。",
            },
      };
    },
    resetHollandTest(state, action) {
      return {
        ...state,
        resultResponse: null,
        currentAnswers: [],
        error: null,
        currentPage: 0,
      };
    },
    receiveHollandTestResult(state, action) {
      return {
        ...state,
        testResult: action.payload,
        loading: false,
      };
    },
    resetCurrentTest(state, action) {
      return {
        ...state,
        currentAnswers: [],
        currentPage: 0,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  receiveHollandTestingData,
  receiveHollandTestResponse,
  updateCurrentAnswers,
  resetHollandTest,
  toggleLoading,
  receiveHollandTestResult,
  resetCurrentTest,
} = hollandTestSlice.actions;

export default hollandTestSlice.reducer;
