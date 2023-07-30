/* eslint-disable react/prop-types */
const Notification = ({ message, type }) => {
  if (!message) return null;

  return <div className={`notification ${type}`}>{message}</div>;
};

export default Notification;
