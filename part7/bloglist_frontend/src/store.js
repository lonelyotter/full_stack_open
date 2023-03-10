import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";
import usersReducer from "./reducers/usersReducer";
import userDetailReducer from "./reducers/userDetailReducer";
import blogDetailReducer from "./reducers/blogDetailReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
    userDetail: userDetailReducer,
    blogDetail: blogDetailReducer,
  },
});

export default store;
