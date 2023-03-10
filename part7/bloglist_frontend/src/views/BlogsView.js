import Togglable from "../components/Togglable";
import BlogForm from "../components/BlogForm";
import BlogList from "../components/BlogList";

import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";

import { initializeBlogs } from "../reducers/blogReducer";

const BlogsView = () => {
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  return (
    <div>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <BlogList user={user} />
    </div>
  );
};

export default BlogsView;
