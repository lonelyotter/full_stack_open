import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    _setUser(state, action) {
      return action.payload;
    },
    _clearUser(state, action) {
      return null;
    },
  },
});

export const { _setUser, _clearUser } = userSlice.actions;

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(_setUser(user));
  };
};

export const clearUser = () => {
  return async (dispatch) => {
    dispatch(_clearUser());
  };
};

export default userSlice.reducer;
