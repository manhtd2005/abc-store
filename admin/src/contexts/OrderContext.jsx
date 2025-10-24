// ...existing code...
import React, { createContext, useCallback, useEffect, useState } from "react";
import { getAllOrders } from "../services/orderService";

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // normalize response to array of orders
  const extractOrders = (res) => {
    if (!res) return [];
    if (Array.isArray(res)) return res;
    if (Array.isArray(res.orders)) return res.orders;
    if (res.data && Array.isArray(res.data.orders)) return res.data.orders;
    if (res.data && Array.isArray(res.data)) return res.data;
    return [];
  };

  // Fetch all orders from API
  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllOrders();
      const list = extractOrders(res);
      // Optionally sort by date desc (newest first) if createdAt exists
      const sorted = Array.isArray(list)
        ? list.slice().sort((a, b) => {
            const da =
              new Date(a?.createdAt || a?.date || a?.created_at).getTime() || 0;
            const db =
              new Date(b?.createdAt || b?.date || b?.created_at).getTime() || 0;
            return db - da;
          })
        : [];
      setOrders(sorted);
      return { success: true, orders: sorted };
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Error fetching orders";
      setError(msg);
      console.error("fetchAllOrders:", err);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  // Total orders
  const getTotalOrders = useCallback(() => orders.length, [orders]);

  // Orders by status -> [{ status, value }]
  const getOrdersByStatus = useCallback(() => {
    const map = orders.reduce((acc, o) => {
      const s = (o?.status || "unknown").toString();
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(map).map((k) => ({ status: k, value: map[k] }));
  }, [orders]);

  // Orders count grouped by month -> [{ month: 'YYYY-MM', count }]
  const getOrdersByMonth = useCallback(() => {
    const map = orders.reduce((acc, o) => {
      const dateStr = o?.createdAt || o?.created_at || o?.date;
      if (!dateStr) return acc;
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return acc;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(map)
      .sort()
      .map((m) => ({ month: m, count: map[m] }));
  }, [orders]);

  // Revenue by month -> [{ month: 'YYYY-MM', revenue }]
  const getRevenueByMonth = useCallback(() => {
    const map = orders.reduce((acc, o) => {
      const dateStr = o?.createdAt || o?.created_at || o?.date;
      if (!dateStr) return acc;
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return acc;
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}`;

      // prefer explicit totalPrice, fallback to computing from items
      let total = 0;
      if (typeof o?.totalPrice === "number") total = o.totalPrice;
      else if (typeof o?.total_price === "number") total = o.total_price;
      else if (typeof o?.total === "number") total = o.total;
      else if (Array.isArray(o?.items)) {
        total = o.items.reduce((sum, it) => {
          const price = Number(it?.price ?? it?.product?.price ?? 0);
          const qty = Number(it?.quantity ?? it?.qty ?? it?.count ?? 0);
          return sum + price * qty;
        }, 0);
      }
      acc[key] = (acc[key] || 0) + (isNaN(total) ? 0 : total);
      return acc;
    }, {});
    return Object.keys(map)
      .sort()
      .map((m) => ({ month: m, revenue: map[m] }));
  }, [orders]);

  // Average order value
  const getAverageOrderValue = useCallback(() => {
    if (!orders.length) return 0;
    const total = orders.reduce((sum, o) => {
      if (typeof o?.totalPrice === "number") return sum + o.totalPrice;
      if (typeof o?.total_price === "number") return sum + o.total_price;
      if (typeof o?.total === "number") return sum + o.total;
      if (Array.isArray(o?.items)) {
        return (
          sum +
          o.items.reduce((s, it) => {
            const price = Number(it?.price ?? it?.product?.price ?? 0);
            const qty = Number(it?.quantity ?? it?.qty ?? it?.count ?? 0);
            return s + price * qty;
          }, 0)
        );
      }
      return sum;
    }, 0);
    return orders.length ? total / orders.length : 0;
  }, [orders]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  const value = {
    orders,
    loading,
    error,
    fetchAllOrders,
    getTotalOrders,
    getOrdersByStatus,
    getOrdersByMonth,
    getRevenueByMonth,
    getAverageOrderValue,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
