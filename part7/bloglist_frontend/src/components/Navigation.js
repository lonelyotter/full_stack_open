import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { clearUser } from "../reducers/userReducer";

const Navigation = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(clearUser());
  };

  const style = {
    backgroundColor: "lightgrey",
    padding: 5,
  };

  return (
    <div style={style}>
      <Link to="/blogs">blogs</Link> <Link to="/users">users</Link> {user.name}{" "}
      logged in <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Navigation;
