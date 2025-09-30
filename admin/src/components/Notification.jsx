import { useEffect, useState } from "react";
import { getNotifications, markAsRead, deleteNotification } from "../services/notificationHelper";

const Notification = ({ setUnreadCount }) => {
  const [notifications, setNotifications] = useState([]);

  // Load khi mở dropdown
  useEffect(() => {
    setNotifications(getNotifications());
  }, []);

  // Tính số chưa đọc
  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length);
  }, [notifications, setUnreadCount]);

  const handleMarkAsRead = (id) => {
    const updated = markAsRead(id);
    setNotifications(updated);
  };

  const handleDelete = (id) => {
    const updated = deleteNotification(id);
    setNotifications(updated);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-80 p-4">
      <h3 className="text-lg font-bold mb-2">Thông báo</h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500">Không có thông báo</p>
      ) : (
        <ul className="max-h-60 overflow-y-auto">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-2 mb-2 border rounded ${
                n.read ? "bg-gray-100" : "bg-blue-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800">{n.message}</p>
                <div className="flex space-x-2">
                  {!n.read && (
                    <button
                      className="text-xs text-green-600"
                      onClick={() => handleMarkAsRead(n.id)}
                    >
                      Đọc
                    </button>
                  )}
                  <button
                    className="text-xs text-red-600"
                    onClick={() => handleDelete(n.id)}
                  >
                    Xoá
                  </button>
                </div>
              </div>
              <span className="text-xs text-gray-500">{n.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
