import { createSlice } from "@reduxjs/toolkit";

import {
  CurrentAnswer,
  QuestionGroup,
  Topic,
} from "../../helper/dataTypes/dimensionTest";
import { ResultResponse } from "./holland.d";

export interface DimensionTestState {
  questions: QuestionGroup[];
  totalQuestions: number;
  topics: Topic[];
  currentPage: number;
  currentAnswers: CurrentAnswer[];
  loading: boolean;
  resultResponse: ResultResponse | null;
  testResult: any;
}

const initialState: DimensionTestState = {
  questions: [],
  topics: [],
  totalQuestions: 0,
  currentPage: 0,
  currentAnswers: [],
  loading: false,
  resultResponse: null,
  testResult: {
    success: false,
    message: "",
    data: null,
  },
};

export const dimensionTestSlice = createSlice({
  name: "dimensionTest",
  initialState,
  reducers: {
    receiveTestingData(state, action) {
      const { success, data, message } = action.payload;
      return {
        ...state,
        questions: success
          ? data && Array.isArray(data.details)
            ? data.details
            : []
          : [],
        topics: success
          ? data && Array.isArray(data.topics)
            ? data.topics
            : []
          : [],
        totalQuestions: success
          ? data && data.totalQuestions
            ? data.totalQuestions
            : 0
          : 0,
        loading: false,
      };
    },
    updateLoadingStatus(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    updateCurrentAnswers(state, action) {
      return {
        ...state,
        currentAnswers: [...state.currentAnswers].concat(action.payload),
        currentPage: state.currentPage + 1,
      };
    },
    resetCurrentPage(state, action) {
      return {
        ...state,
        currentPage: 0,
      };
    },
    updateCurrentAnswersForTesting(state, action) {
      return {
        ...state,
        currentAnswers: [...state.currentAnswers].concat(
          action.payload.answers,
        ),
        currentPage: action.payload.page,
      };
    },
    receiveDimensionResultResponse(state, action) {
      return {
        ...state,
        resultResponse: action.payload,
      };
    },
    resetDimensionTest(state, action) {
      return {
        ...state,
        currentPage: 0,
        currentAnswers: [],
        resultResponse: null,
      };
    },
    receiveDimensionTestResult(state, action) {
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
  receiveTestingData,
  updateLoadingStatus,
  updateCurrentAnswers,
  resetCurrentPage,
  updateCurrentAnswersForTesting,
  receiveDimensionResultResponse,
  resetDimensionTest,
  receiveDimensionTestResult,
  resetCurrentTest,
} = dimensionTestSlice.actions;

export default dimensionTestSlice.reducer;
