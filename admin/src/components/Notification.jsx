import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

const Notification = () => {
  const { notifications, markAllRead, deleteNotification } =
    useContext(NotificationContext);

  return (
    <div className="bg-white shadow-lg rounded-lg border w-80 p-2">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold">Notifications</h3>

        {/* -------------------- Mark All Read ----------------- */}
        <button onClick={markAllRead} className="p-1 underline text-blue-500">
          Mark All Read
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notification!</p>
      ) : (
        <ul className="max-h-60 overflow-y-auto">
          {/* ------------------------- List notification ------------------- */}
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-2 mb-2 border rounded ${
                notification.read ? "bg-white" : "bg-blue-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-800">{notification.message}</p>

                <button
                  className="text-xs text-red-500 hover:text-red-700 p-1"
                  onClick={() => deleteNotification(notification.id)}
                >
                  Delete
                </button>
              </div>
              <span className="text-xs text-gray-500">{notification.time}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Notification;
