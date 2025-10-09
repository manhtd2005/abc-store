import { useCallback } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAllOrders } from "../services/orderService";

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // State toàn cục
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Lấy tất cả hóa đơn
  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllOrders();
      if (res?.orders) setOrders(res.orders);
      else if (res?.success && res.orders) setOrders(res.orders);
      else setError(res?.message || "Không thể lấy tất cả đơn hàng");
      return res;
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const value = {
    orders,
    loading,
    error,
    fetchAllOrders,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
