import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.on("notification", (data) => {
      // @ts-ignore
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li
            key={index}
            style={getNotificationStyle(
              // @ts-ignore
              notification.type
            )}
          >
            {
              // @ts-ignore
              notification.message
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

const getNotificationStyle = (type) => {
  switch (type) {
    case "connection":
      return { color: "green" };
    case "disconnection":
      return { color: "red" };
    default:
      return { color: "black" };
  }
};

export default Notification;
