import { useSelector, useDispatch } from "react-redux";

import { likeBlog, removeBlog } from "../reducers/blogReducer";

import Blog from "./Blog";

const BlogList = ({ user }) => {
  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  });

  const dispatch = useDispatch();

  const like = (id) => {
    dispatch(likeBlog(id));
  };

  const remove = (id) => {
    dispatch(removeBlog(id));
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          className="blog"
          key={blog.id}
          blog={blog}
          like={() => like(blog.id)}
          canRemove={user && user.username === blog.user.username}
          remove={() => remove(blog.id)}
        />
      ))}
    </div>
  );
};

export default BlogList;
