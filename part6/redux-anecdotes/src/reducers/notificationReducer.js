import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setInfo(state, action) {
      return action.payload;
    },
    clearInfo(state, action) {
      return "";
    },
  },
});

export const { setInfo, clearInfo } = notificationSlice.actions;

export const setNotification = (message, second) => {
  return async (dispatch) => {
    dispatch(setInfo(message));
    setTimeout(() => {
      dispatch(clearInfo());
    }, second * 1000);
  };
};

export default notificationSlice.reducer;
