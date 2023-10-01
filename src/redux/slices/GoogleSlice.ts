import { createSlice } from "@reduxjs/toolkit";

import { GoogleModel } from "../../models/GoogleModel";

const initialState: GoogleModel = {
  places: [],
};

const GoogleSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setPlaces(state, action) {
      state.places = action.payload;
    },
  },
});

export const { setPlaces } = GoogleSlice.actions;

export default GoogleSlice.reducer;
