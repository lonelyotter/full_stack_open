import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogDetailSlice = createSlice({
  name: "blogDetail",
  initialState: null,
  reducers: {
    setBlogDetail(state, action) {
      return action.payload;
    },
  },
});

export const { setBlogDetail } = blogDetailSlice.actions;

export const initializeBlogDetail = (id) => {
  return async (dispatch) => {
    const blog = await blogService.getOne(id);
    dispatch(setBlogDetail(blog));
  };
};

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blog = getState().blogDetail;
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    const returnedBlog = await blogService.update(id, updatedBlog);
    dispatch(setBlogDetail(returnedBlog));
  };
};

export default blogDetailSlice.reducer;
