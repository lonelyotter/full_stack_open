import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { initializeUserDetail } from "../reducers/userDetailReducer";

const UserView = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userDetail);

  useEffect(() => {
    dispatch(initializeUserDetail(id));
  }, [dispatch, id]);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserView;
