import { createContext, useContext, useEffect, useState } from "react";
import { notificationUrl } from "../const";
import { showErrorToast, showSuccessToast } from "../components/common/toast";
import { LoginContext } from "../App";

export const NotificationContext = createContext();

const WebSocketProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [loggedIn] = useContext(LoginContext);
  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")).id
    : null;

  useEffect(() => {
    let ws;
    if (loggedIn && userId) {
      ws = new WebSocket(`${notificationUrl}ws/${userId}`);
      ws.onopen = () => {
        setIsConnected(true);
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message);

        if (message.type === "message") {
          showSuccessToast(message.message);
        }
        if (message.type === "users_notifications") {
          setNotifications(message.notifications);
        }
        if (message.type === "notification") {
          setNotifications((currentNotifications) => [
            message.message,
            ...currentNotifications,
          ]);
          showSuccessToast("You have a new notification!");
        }
      };

      ws.onerror = (error) => {
        // Handle WebSocket errors
        console.log("WebSocket error: ", error.message);
        setIsConnected(false);
      };
    } else {
      console.log("WebSocket Client Disconnected");
      setIsConnected(false);
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [loggedIn, userId]);

  return (
    <NotificationContext.Provider value={{ notifications, isConnected }}>
      {children}
    </NotificationContext.Provider>
  );
};

export default WebSocketProvider;
