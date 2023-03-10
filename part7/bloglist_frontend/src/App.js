import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import blogService from "./services/blogs";
import loginService from "./services/login";

import { setNotification } from "./reducers/notificationReducer";
import { setUser, clearUser } from "./reducers/userReducer";

import HomeView from "./views/HomeView";
import UsersView from "./views/UsersView";
import UserView from "./views/UserView";
import BlogView from "./views/BlogView";

import Notification from "./components/Notification";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
      dispatch(setNotification("Login successful", true, 5));
    } catch (exception) {
      dispatch(setNotification("Wrong username or password", false, 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(clearUser());
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification />

      <h2>blogs</h2>

      <p>{user.name} logged in</p>

      <p>
        <button onClick={handleLogout}>logout</button>
      </p>

      <Routes>
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/users" element={<UsersView />} />
        <Route path="/blogs/:id" element={<BlogView />} />
        <Route path="/" element={<HomeView />} />
      </Routes>
    </div>
  );
};

export default App;
