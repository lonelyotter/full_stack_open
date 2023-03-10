import { useSelector } from "react-redux";

import Blog from "./Blog";

const BlogList = () => {
  const blogs = useSelector(({ blogs }) => {
    return [...blogs].sort((a, b) => b.likes - a.likes);
  });

  return (
    <div>
      {blogs.map((blog) => (
        <Blog className="blog" key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
