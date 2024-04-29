import React, { useContext } from "react";
import ProductNotification from "./Notifications/ProductNotification";
import CaseNotification from "./Notifications/CaseNotification";
import { NotificationContext } from "../../Services/WebSocketContext";

export default function NotificationPanel({ notificationRef }) {
  const { notifications } = useContext(NotificationContext);

  const renderNotification = (notification) => {
    switch (notification.type) {
      case "case":
        return <CaseNotification key={notification.id} notification={notification} />;
      case "product":
        return <ProductNotification key={notification.id} notification={notification} />;
      default:
        return <p key={notification.id} className="text-sm text-gray-600">{notification.content}</p>;
    }
  };

  return (
    <div
      ref={notificationRef}
      className="fixed top-16 right-0 w-80 h-[calc(100%-4rem)] rounded-lg bg-white dark:bg-ff_bg_sidebar_dark shadow-md z-50 mr-2 mt-2 overflow-y-auto"
    >
      <div className="text-xl font-semibold p-4">Notifications</div>
      <div className="p-2 space-y-2">
        {notifications.map(renderNotification)}
      </div>
    </div>
  );
}
