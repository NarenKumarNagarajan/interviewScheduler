import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    selectedMonth: new Date().getMonth(),
    selectedYear: new Date().getFullYear(),
    rangeSelected: "Month",
  },
  reducers: {
    changeSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
    changeSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    changeRange: (state, action) => {
      state.rangeSelected = action.payload;
    },
  },
});

export const { changeSelectedMonth, changeSelectedYear, changeRange } =
  appSlice.actions;

export default appSlice.reducer;
