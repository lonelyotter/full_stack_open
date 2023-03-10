import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  };

  return (
    <div style={style} className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
