import { createSlice } from "@reduxjs/toolkit";

export interface HomeState {
  sliders: Array<any>;
  error: any;
}

const initialState: HomeState = {
  sliders: [],
  error: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    receiveSliders(state, action) {
      return {
        ...state,
        sliders: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { receiveSliders } = homeSlice.actions;

export default homeSlice.reducer;
