import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";
import {
  getAllOrders,
  getUserOrders,
  placeOrderCOD,
  placeOrderMBBank,
  placeOrderTechcombank,
} from "../services/orderService";
import { CartContext } from "./CartContext";

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  // State toàn cục
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // access cart functions to clear cart after successful order
  const {
    cart = [],
    removeFromCart,
    fetchCart,
    setTotal,
  } = useContext(CartContext) || {};

  const getProductIdFromCartItem = (item) =>
    item?.productId ||
    item?.product?._id ||
    item?._id ||
    item?.id ||
    item?.product;

  // Xóa thông tin giỏ hàng sau khi thanh toán thành công
  const clearCartAfterOrder = useCallback(async () => {
    try {
      if (!cart || cart.length === 0) {
        if (typeof setTotal === "function") setTotal(0);
        return;
      }
      // If removeFromCart is available, remove each item on server
      if (typeof removeFromCart === "function") {
        await Promise.all(
          cart.map(async (item) => {
            const pid = getProductIdFromCartItem(item);
            if (pid) {
              try {
                await removeFromCart(pid);
              } catch (err) {
                console.error("Failed to remove cart item:", pid, err);
              }
            }
          })
        );
        // refresh cart from server if fetchCart exists
        if (typeof fetchCart === "function") await fetchCart();
      } else {
        // If no server-side remove available, just try to refresh cart
        if (typeof fetchCart === "function") await fetchCart();
      }
      if (typeof setTotal === "function") setTotal(0);
    } catch (err) {
      console.error("Error clearing cart after order:", err);
    }
  }, [cart, removeFromCart, fetchCart, setTotal]);

  // Lấy tất cả hóa đơn của 1 user
  const fetchUserOrders = useCallback(async (userId) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getUserOrders(userId);
      if (res?.success) setOrders(res.orders || []);
      else if (res?.orders) setOrders(res.orders || []);
      else setError(res?.message || "Không thể lấy đơn hàng");
      return res;
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

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

  // Thanh toán đơn hàng
  const placeOrder = useCallback(
    async ({ method = "COD", userId, items, contact = {}, total }) => {
      setLoading(true);
      setError(null);
      try {
        let res;
        if (method === "COD") {
          res = await placeOrderCOD({ userId, items, contact, total });
        } else if (method === "MBBank") {
          res = await placeOrderMBBank({ userId, items, contact, total });
        } else if (method === "Techcombank") {
          res = await placeOrderTechcombank({ userId, items, contact, total });
        } else {
          throw new Error("Unsupported payment method");
        }

        if (res?.success && res.order) {
          setOrders((prev) => [res.order, ...prev]);
          // clear cart after successful order
          await clearCartAfterOrder();
        }

        return res;
      } catch (err) {
        setError(err.message);
        return { success: false, message: err.message };
      } finally {
        setLoading(false);
      }
    },
    [clearCartAfterOrder]
  );

  useEffect(() => {
    // nếu lưu thông tin user trong localStorage, tự động tải đơn hàng của user khi mở app
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        if (u && (u._id || u.id)) fetchUserOrders(u._id || u.id);
      }
    } catch {
      /* ignore parse errors */
    }
  }, [fetchUserOrders]);

  const value = {
    orders,
    loading,
    error,
    fetchUserOrders,
    fetchAllOrders,
    placeOrder,
  };

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
};
