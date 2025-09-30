import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { FaCheckDouble } from "react-icons/fa";

const Notification = ({ isOpen }) => {
  const [notifications, setNotifications] = useState([]);

  // Lưu vào cookie mỗi khi thay đổi
  useEffect(() => {
    Cookies.set("notifications", JSON.stringify(notifications));
  }, [notifications]);

  // Load từ cookie khi component mount
  useEffect(() => {
    const stored = Cookies.get("notifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    } else {
      // ví dụ data mẫu
      const initialData = [];
      setNotifications(initialData);
      Cookies.set("notifications", JSON.stringify(initialData));
    }
  }, []);

  // Đánh dấu tất cả đã đọc
  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
  };

  // Helper: cắt bớt text nếu dài
  const truncate = (str, maxLines = 2) => {
    const words = str.split(" ");
    if (words.length > 12) {
      return words.slice(0, 12).join(" ") + "...";
    }
    return str;
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-16 right-4 w-96 bg-white shadow-lg rounded-lg border">
      {/* -------------------------------- Icon --------------------------------- */}
      <div className="flex justify-between items-center px-4 py-2 border-b cursor-pointer">
        <span className="font-semibold text-gray-700 cursor-default">
          Notification
        </span>
        <button
          onClick={markAllRead}
          className="flex items-center text-blue-600 text-sm hover:underline"
        >
          <FaCheckDouble className="mr-1" /> Read all
        </button>
      </div>

      {/* Nội dung */}
      <div className="max-h-64 overflow-y-auto">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex justify-between items-center px-4 py-2 border-b ${
              !n.read ? "font-semibold" : "font-normal text-gray-600"
            }`}
          >
            <div className="flex-1">
              <p className="truncate-2-lines">
                {truncate(n.message)}
                {!n.read && <span className="text-red-500 ml-1">•</span>}
              </p>
            </div>
            <div className="ml-2 text-sm text-gray-500">{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notification;
