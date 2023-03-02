import { useState } from "react";

const Blog = ({ blog, like, canRemove, remove }) => {
  const [visible, setVisible] = useState(false);

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: "solid",
  };

  return (
    <div style={style} className="blog">
      {blog.title} {blog.author}
      <button onClick={() => setVisible(!visible)}>
        {visible ? "hide" : "show"}
      </button>
      {visible && (
        <div>
          <div>
            {" "}
            <a href={blog.url}> {blog.url}</a>{" "}
          </div>
          <div>
            likes {blog.likes} <button onClick={like}>like</button>
          </div>
          <div>{blog.user && blog.user.name}</div>
          {canRemove && <button onClick={remove}>delete</button>}
        </div>
      )}
    </div>
  );
};

export default Blog;
