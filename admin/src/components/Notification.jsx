import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

const Notification = () => {
  const {
    notifications: contextNotifications,
    markAsRead: contextMarkAsRead,
    deleteNotification: contextDeleteNotification
  } = useContext(NotificationContext);

  const notifications = contextNotifications;

  const handleMarkAsRead = (id) => {
    contextMarkAsRead(id);
  };

  const handleDelete = (id) => {
    contextDeleteNotification(id);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg w-80 p-4">
      <h3 className="text-lg font-bold mb-2">Notifications</h3>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No notification!</p>
      ) : (
        <ul className="max-h-60 overflow-y-auto">
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`p-2 mb-2 border rounded ${n.read ? "bg-gray-100" : "bg-blue-50"
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