import { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const stored = Cookies.get("notifications");
        if (stored) {
            setNotifications(JSON.parse(stored));
        }
    }, []);

    useEffect(() => {
        const latestNotifications = notifications.slice(0, 20);
        Cookies.set("notifications", JSON.stringify(latestNotifications));
    }, [notifications]);

    const addNotification = (message) => {
        const newNotification = {
            id: new Date().getTime(),
            message,
            time: new Date().toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
            }),
            read: false,
        };
        setNotifications((prev) => [newNotification, ...prev]);
    };

    const markAllRead = () => {
        const updated = notifications.map((n) => ({ ...n, read: true }));
        setNotifications(updated);
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    const value = {
        notifications,
        addNotification,
        markAllRead,
        unreadCount,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    return useContext(NotificationContext);
};