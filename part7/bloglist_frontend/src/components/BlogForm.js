import { useState } from "react";
import { createBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";

const BlogForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (event) => {
    event.preventDefault();
    dispatch(createBlog({ title, author, url }));
    dispatch(
      setNotification(`a new blog ${title} by ${author} added`, true, 5)
    );
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id="title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
            placeholder="title of the blog"
          />
        </div>
        <div>
          author:
          <input
            id="author"
            value={author}
            onChange={(event) => {
              setAuthor(event.target.value);
            }}
            placeholder="author of the blog"
          />
        </div>
        <div>
          url:
          <input
            id="url"
            value={url}
            onChange={(event) => {
              setUrl(event.target.value);
            }}
            placeholder="url of the blog"
          />
        </div>
        <button id="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
