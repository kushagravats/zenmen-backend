import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Notification = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.on("notification", (data) => {
      // @ts-ignore
      setNotifications((prevNotifications) => [...prevNotifications, data]);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>
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

export default Notification;
