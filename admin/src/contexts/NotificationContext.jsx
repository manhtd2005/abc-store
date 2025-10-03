import { createContext, useState, useEffect } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  //  Thêm thông báo mới
  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message,
      read: false, // trạng thái đọc
      time: new Date().toLocaleString(), // thời gian tạo
    };

    setNotifications((prev) => [newNotification, ...prev]);
  };

  //  Đánh dấu tất cả đã đọc
  const markAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  //  Xoá 1 thông báo theo id
  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  //  Đếm số lượng thông báo chưa đọc
  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  //  Load từ localStorage khi mount
  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch (err) {
        console.error("Not parse for notifications:", err);
      }
    }
  }, []);

  //  Mỗi khi notifications thay đổi thì lưu lại vào localStorage
  useEffect(() => {
    localStorage.setItem("notifications", JSON.stringify(notifications));
  }, [notifications]);

  const value = {
    notifications,
    addNotification,
    markAllRead,
    unreadCount,
    deleteNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
