import { createSlice } from "@reduxjs/toolkit";

import { ErrorMessage, StandardResponse } from "../../helper/commonTypes";
import { Consultant, ConsultingFilter, Region } from "./consult.d";

export interface ConsultingState {
  consultants: Consultant[];
  regions: Region[];
  educationLevels: string[];
  error: ErrorMessage | null;
  filters: ConsultingFilter;
  selectedConsultant: Consultant | null;
  contactFormVisible: boolean;
  currentPage: number;
  loading: boolean;
  joinUsVisible: boolean;
  inquiryResponse: StandardResponse | null;
}

const initialState: ConsultingState = {
  consultants: [],
  regions: [],
  educationLevels: [],
  error: null,
  filters: {
    regionId: 0,
    programCategoryId: 0,
    educationLevel: "",
    keyword: "",
  },
  currentPage: 1,
  contactFormVisible: false,
  selectedConsultant: null,
  loading: false,
  joinUsVisible: true,
  inquiryResponse: null,
};

export const consultingSlice = createSlice({
  name: "consulting",
  initialState,
  reducers: {
    updateLoadingStatus(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    receiveConsultingData(state, action) {
      if (!action.payload || !action.payload.data) {
        return {
          ...state,
        };
      }
      const { consultants, regions, educationLevels } = action.payload.data;
      return {
        ...state,
        consultants: Array.isArray(consultants) ? consultants : [],
        regions: Array.isArray(regions) ? regions : [],
        educationLevels: Array.isArray(educationLevels) ? educationLevels : [],
        loading: false,
      };
    },
    receiveError(state, action) {
      return {
        ...state,
        error: action.payload,
      };
    },
    toggleContactModal(state, action) {
      const { visible, consultant } = action.payload;
      return {
        ...state,
        contactFormVisible: visible,
        selectedConsultant: consultant,
      };
    },
    updateFilters(state, action) {
      return {
        ...state,
        filters: action.payload,
        currentPage: 1,
      };
    },
    updatePage(state, action) {
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    },
    setJoinUsVisible(state, action) {
      return {
        ...state,
        joinUsVisible: action.payload,
      };
    },
    receiveInquiryResponse(state, action) {
      return {
        ...state,
        inquiryResponse: action.payload,
        loading: false,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  receiveConsultingData,
  receiveError,
  toggleContactModal,
  updateFilters,
  updatePage,
  updateLoadingStatus,
  setJoinUsVisible,
  receiveInquiryResponse,
} = consultingSlice.actions;

export default consultingSlice.reducer;
