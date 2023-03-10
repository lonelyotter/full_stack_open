import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    message: "",
    isSuccess: true,
  },
  reducers: {
    setInfo(state, action) {
      return action.payload;
    },
    clearInfo(state, action) {
      return {
        message: "",
        isSuccess: true,
      };
    },
  },
});

export const { setInfo, clearInfo } = notificationSlice.actions;

export const setNotification = (message, isSuccess, second) => {
  return async (dispatch) => {
    dispatch(setInfo({ message, isSuccess }));
    setTimeout(() => {
      dispatch(clearInfo());
    }, second * 1000);
  };
};

export default notificationSlice.reducer;
