const Notification = ({ message, isSuccess }) => {
  if (message === null) {
    return null;
  }

  if (isSuccess) {
    return <div className="success">{message}</div>;
  }

  return <div className="error">{message}</div>;
};

export default Notification;
