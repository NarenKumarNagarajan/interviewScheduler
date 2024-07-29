import { configureStore } from "@reduxjs/toolkit";

import dataSlice from "./dataSlice";
import appSlice from "./appSlice";

const appStore = configureStore({
  reducer: {
    dataSlice: dataSlice,
    appSlice: appSlice,
  },
});

export default appStore;
