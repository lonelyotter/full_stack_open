import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

const userDetailSlice = createSlice({
  name: "userDetail",
  initialState: null,
  reducers: {
    setUserDetail(state, action) {
      return action.payload;
    },
  },
});

export const { setUserDetail } = userDetailSlice.actions;

export const initializeUserDetail = (id) => {
  return async (dispatch) => {
    const user = await userService.getOne(id);
    dispatch(setUserDetail(user));
  };
};

export default userDetailSlice.reducer;
