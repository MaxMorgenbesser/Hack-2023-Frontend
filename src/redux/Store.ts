import { configureStore } from "@reduxjs/toolkit";

import UserSlice from "./slices/UserSlice";
import GoogleSlice from "./slices/GoogleSlice";


const store = configureStore({
  reducer: {
    user:UserSlice,
    google:GoogleSlice
  },
});

export default store;