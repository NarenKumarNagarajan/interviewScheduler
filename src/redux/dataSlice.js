import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "dataSlice",
  initialState: {
    eventsData: [],
    weekIndex: 0,
    weekLength: 0,
  },
  reducers: {
    addEventsData: (state, action) => {
      state.eventsData = action.payload;
    },

    changeWeekIndex: (state, action) => {
      state.weekIndex = action.payload;
    },
    changeWeekLength: (state, action) => {
      state.weekLength = action.payload;
    },
  },
});

export const { addEventsData, changeWeekIndex, changeWeekLength } =
  dataSlice.actions;

export default dataSlice.reducer;
