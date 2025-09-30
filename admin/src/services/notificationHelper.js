import Cookies from "js-cookie";

// Hàm thêm thông báo mới
export const addNotification = (message) => {
  const stored = Cookies.get("notifications");
  let notifications = stored ? JSON.parse(stored) : [];

  const newNotification = {
    id: Date.now(),
    message,
    read: false,
    time: new Date().toLocaleString(),
  };

  notifications.unshift(newNotification); // thêm mới lên đầu
  Cookies.set("notifications", JSON.stringify(notifications));
};

// Hàm lấy thông báo
export const getNotifications = () => {
  const stored = Cookies.get("notifications");
  return stored ? JSON.parse(stored) : [];
};

// Hàm cập nhật trạng thái đọc
export const markAsRead = (id) => {
  let notifications = getNotifications();
  notifications = notifications.map((n) =>
    n.id === id ? { ...n, read: true } : n
  );
  Cookies.set("notifications", JSON.stringify(notifications));
  return notifications;
};

// Hàm xoá 1 thông báo
export const deleteNotification = (id) => {
  let notifications = getNotifications();
  notifications = notifications.filter((n) => n.id !== id);
  Cookies.set("notifications", JSON.stringify(notifications));
  return notifications;
};
