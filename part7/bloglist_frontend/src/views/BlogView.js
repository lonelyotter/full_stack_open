import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import { initializeBlogDetail } from "../reducers/blogDetailReducer";
import { likeBlog } from "../reducers/blogDetailReducer";

const BlogView = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const blog = useSelector((state) => state.blogDetail);

  useEffect(() => {
    dispatch(initializeBlogDetail(id));
  }, [dispatch, id]);

  const like = (e) => {
    e.preventDefault();
    dispatch(likeBlog(id));
  };

  if (!blog) {
    return null;
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes <button onClick={like}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment) => {
          return <li key={comment}>{comment}</li>;
        })}
      </ul>
    </div>
  );
};

export default BlogView;
