import { useSelector } from "react-redux";

const Notification = () => {
  const { message, isSuccess } = useSelector((state) => state.notification);

  if (message === "") {
    return null;
  }

  if (isSuccess) {
    return <div className="success">{message}</div>;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
