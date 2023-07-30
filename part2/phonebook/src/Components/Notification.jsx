/* eslint-disable react/prop-types */
const Notification = ({ message, type }) => {
  if (!message) return null;

  return <div className={`Notification ${type}`}>{message}</div>;
};

export default Notification;
