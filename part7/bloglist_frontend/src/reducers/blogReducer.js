import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      const updatedBlog = action.payload;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    deleteBlog(state, action) {
      const id = action.payload.id;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (object) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.create(object);
    dispatch(appendBlog(returnedBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch(deleteBlog({ id }));
  };
};

export default blogSlice.reducer;
