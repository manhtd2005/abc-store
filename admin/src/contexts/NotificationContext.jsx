import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

// eslint-disable-next-line react-refresh/only-export-components
export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    // Load từ cookies khi mount
    useEffect(() => {
        const stored = Cookies.get("notifications");
        if (stored) {
            setNotifications(JSON.parse(stored));
        }
    }, []);

    // Mỗi khi notifications thay đổi thì lưu lại vào cookies (chỉ giữ 20 cái mới nhất)
    useEffect(() => {
        const latestNotifications = notifications.slice(0, 20);
        Cookies.set("notifications", JSON.stringify(latestNotifications));
    }, [notifications]);

    // Thêm thông báo mới
    const addNotification = (message) => {
        const newNotification = {
            id: Date.now(),
            message,
            read: false,
            time: new Date().toLocaleString(),
        };

        setNotifications((prev) => [newNotification, ...prev].slice(0, 20));
    };

    // Đánh dấu tất cả đã đọc
    const markAllRead = () => {
        const updated = notifications.map((n) => ({ ...n, read: true }));
        setNotifications(updated);
    };

    // Xoá 1 thông báo theo id
    const deleteNotification = (id) => {
        const updated = notifications.filter((n) => n.id !== id);
        setNotifications(updated);
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    const value = {
        notifications,
        addNotification,
        markAllRead,
        unreadCount,
        deleteNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
