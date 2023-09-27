import { createSlice } from "@reduxjs/toolkit";

import { BookedProgram, ProgramDetails, ProgramItem } from "./program.d";

export interface ProgramState {
  list: ProgramItem[];
  currentProgramCategoryId: number;
  currentProgram: ProgramDetails | null;
  details: Array<any>;
  loading: boolean;
  bookedProgram: BookedProgram | null;
}

const initialState: ProgramState = {
  list: [],
  currentProgram: null,
  details: [],
  loading: false,
  currentProgramCategoryId: 0,
  bookedProgram: null,
};

export const programSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    receivePrograms(state, action) {
      const newList: ProgramItem[] = Array.isArray(action.payload.data)
        ? action.payload.data
        : [];
      const newCurrentProgram: ProgramDetails | null =
        newList[0] && Array.isArray(newList[0].details) && newList[0].details[0]
          ? newList[0].details[0]
          : null;
      return {
        ...state,
        list: newList,
        currentProgramCategoryId:
          newList[0] && newList[0].id ? newList[0].id : 0,
        currentProgram: state.currentProgram || newCurrentProgram,
        loading: false,
      };
    },
    setCurrentProgram(state, action) {
      return {
        ...state,
        currentProgram: action.payload,
      };
    },
    setCurrentProgramCategoryId(state, action) {
      return {
        ...state,
        currentProgramCategoryId: action.payload,
      };
    },
    receiveProgramDetails(state, action) {
      const newCurrentProgram: ProgramDetails | null = state.currentProgram
        ? { ...state.currentProgram, details: action.payload.data || null }
        : null;
      return {
        ...state,
        loading: false,
        details:
          action.payload.data &&
          !state.details.find(
            (item: any) => item.programId === action.payload.data.programId,
          )
            ? [...state.details, action.payload.data]
            : state.details,
        currentProgram: newCurrentProgram,
      };
    },
    updateLoadingStatus(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    receiveProgramBookingResponse(state, action) {
      return {
        ...state,
        resultResponse: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  receiveProgramBookingResponse,
  receivePrograms,
  setCurrentProgram,
  receiveProgramDetails,
  updateLoadingStatus,
  setCurrentProgramCategoryId,
} = programSlice.actions;

export default programSlice.reducer;
