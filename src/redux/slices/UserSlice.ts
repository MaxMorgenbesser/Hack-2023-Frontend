import { createSlice } from "@reduxjs/toolkit";
import { UserModel } from "../../models/UserModels";

const initialState:UserModel = {
    name:"A name"
};

const UserSlice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {},
});

export const {} = UserSlice.actions;

export default UserSlice.reducer;
