import { createSlice } from "@reduxjs/toolkit";
import lodash from "lodash";

import { ErrorMessage } from "../../helper/commonTypes";
import sortRankingList from "./methods/sortRankingList";
import {
  ProgramRankingFilterOption,
  ProgramRankingItem,
  SchoolRankingItem,
} from "./ranking";

export interface RankingState {
  schoolRankings: SchoolRankingItem[];
  programRankings: ProgramRankingItem[];
  schoolProgramRankings: ProgramRankingItem[];
  currentPageOfSchoolRanking: number;
  currentPageOfProgramRanking: number;
  error: ErrorMessage | null;
  regions: string[];
  programFilters: {
    programFilterValue: ProgramRankingFilterOption | null;
    region: ProgramRankingFilterOption | null;
  };
  schoolRankingFilter: string | null;
  loading: boolean;
}

const initialState: RankingState = {
  schoolRankings: [],
  programRankings: [],
  schoolProgramRankings: [],
  regions: [],
  error: null,
  programFilters: {
    programFilterValue: {
      id: `defaultProgram`,
      group: "",
      name: "综合排名",
      value: "default",
    },
    region: {
      id: "defaultRegion",
      group: "",
      name: "全部",
      value: "all",
    },
  },
  schoolRankingFilter: "",
  currentPageOfSchoolRanking: 1,
  currentPageOfProgramRanking: 1,
  loading: false,
};

export const RankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {
    receiveRankingData(state, action) {
      const { programRankingList, schoolRankingList } = action.payload;
      const uniqRegions: string[] = lodash.uniq(
        schoolRankingList.map((item: SchoolRankingItem) => item.country),
      );
      return {
        ...state,
        loading: false,
        schoolRankings: sortRankingList(schoolRankingList),
        programRankings: sortRankingList(programRankingList),
        currentPage: 1,
        regions: uniqRegions,
        programFilters: {
          programFilterValue: {
            id: `defaultProgram`,
            group: "",
            name: "综合排名",
            value: "default",
          },
          region: {
            id: "defaultRegion",
            group: "",
            name: "全部",
            value: "all",
          },
        },
        error: null,
      };
    },
    receiveError(state, action) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
    updateProgramFilters(state, action) {
      return {
        ...state,
        programFilters: action.payload,
        currentPage: 1,
      };
    },
    updatePage(state, action) {
      return {
        ...state,
        [action.payload.name]: action.payload.newPageNumber,
      };
    },
    updateSchoolFilter(state, action) {
      return {
        ...state,
        schoolRankingFilter: action.payload,
      };
    },
    updateLoadingStatus(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    receiveProgramRankingData(state, action) {
      // let currentDataList = [...state.programRankings];
      // if (
      //   Array.isArray(action.payload) &&
      //   action.payload.length > 0 &&
      //   !currentDataList.find(
      //     (item) =>
      //       action.payload[0].nameForRanking &&
      //       item.nameForRanking &&
      //       item.nameForRanking === action.payload[0].nameForRanking,
      //   )
      // ) {
      //   currentDataList = currentDataList.concat(action.payload);
      // } else {
      //   currentDataList = action.payload;
      // }
      return {
        ...state,
        programRankings: sortRankingList(
          Array.isArray(action.payload) ? action.payload : [],
        ),
      };
    },
    receiveSchoolProgramRankingData(state, action) {
      return {
        ...state,
        schoolProgramRankings: sortRankingList(
          Array.isArray(action.payload) ? action.payload : [],
        ),
      };
    },
  },
});
// Action creators are generated for each case reducer function
export const {
  receiveRankingData,
  receiveError,
  updateProgramFilters,
  updatePage,
  updateSchoolFilter,
  updateLoadingStatus,
  receiveProgramRankingData,
  receiveSchoolProgramRankingData,
} = RankingSlice.actions;

export default RankingSlice.reducer;
