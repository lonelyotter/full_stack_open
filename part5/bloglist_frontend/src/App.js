import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [isSuccess, setIsSuccess] = useState(true);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotificationMessage("Login successful");
      setIsSuccess(true);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    } catch (exception) {
      setNotificationMessage("Wrong username or password");
      setIsSuccess(false);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    let returnedBlog = await blogService.create(blogObject);
    returnedBlog.user = user;
    setBlogs(blogs.concat(returnedBlog).sort((a, b) => b.likes - a.likes));
    setNotificationMessage(`a new blog ${returnedBlog.title} added`);
    setIsSuccess(true);
    setTimeout(() => {
      setNotificationMessage(null);
    }, 5000);
  };

  const like = async (blog) => {
    const blogToUpdate = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    const updatedBlog = await blogService.update(blogToUpdate);
    updatedBlog.user = blog.user;
    setBlogs(
      blogs
        .map((blog) => (blog.id !== updatedBlog.id ? blog : updatedBlog))
        .sort((a, b) => b.likes - a.likes)
    );
  };

  const remove = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      console.log(blog);
      await blogService.remove(blog.id);
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} isSuccess={isSuccess} />
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification message={notificationMessage} isSuccess={isSuccess} />
      <h2>blogs</h2>

      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          like={() => like(blog)}
          canRemove={user && user.username === blog.user.username}
          remove={() => remove(blog)}
        />
      ))}
    </div>
  );
};

export default App;
