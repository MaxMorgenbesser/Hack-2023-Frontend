import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../models/UserModels";

const initialState: UserModel = {
  name: "",
  tempToken: "",
  token: "",
};

const UserSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setTempToken(state, actions) {
      state.tempToken = actions.payload;
    },
    setToken(state,actions) {
        state.token = actions.payload
    }
  },
});

export const { setTempToken, setToken } = UserSlice.actions;

export default UserSlice.reducer;
