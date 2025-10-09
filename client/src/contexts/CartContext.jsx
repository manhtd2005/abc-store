import {
  useState,
  useEffect,
  createContext,
  useCallback,
  useContext,
} from "react";
import {
  addToCartApi,
  getCartApi,
  removeFromCartApi,
  updateCartApi,
} from "../services/cartService";
import { AuthContext } from "./AuthContext";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  // Lấy giỏ hàng khi component mount
  const fetchCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCartApi();
      if (res.success) {
        setCart(res.cartData || []);
      }
    } catch (err) {
      console.error("Error fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // gọi fetchCart khi mount hoặc khi user thay đổi (login/logout)
  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart([]);
    }
  }, [user, fetchCart]);

  // Thêm sản phẩm vào giỏ hàng
  const addToCart = async (productId, quantity = 1) => {
    try {
      const pid = productId?._id || productId?.id || productId;
      const res = await addToCartApi(pid, quantity);
      if (res.success) {
        setCart(res.cartData || []);
      }
    } catch (err) {
      console.error("Error add cart:", err);
    }
  };

  // Cập nhật số lượng sản phẩm
  const updateCart = async (productId, quantity) => {
    try {
      const pid = productId?._id || productId?.id || productId;
      const res = await updateCartApi(pid, quantity);
      if (res.success) {
        setCart(res.cartData || []);
      }
    } catch (err) {
      console.error("Error update cart:", err);
    }
  };

  // Xoá sản phẩm khỏi giỏ
  const removeFromCart = async (productId) => {
    try {
      const pid = productId?._id || productId?.id || productId;
      const res = await removeFromCartApi(pid);
      if (res.success) {
        setCart(res.cartData || []);
      }
    } catch (err) {
      console.error("Error remove cart:", err);
    }
  };

  // Tổng số lượng sản phẩm trong giỏ (nếu mỗi item có quantity)
  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Tính tổng số tiền
  const recalcTotal = (cartItems) => {
    const totalPrice = cartItems.reduce((acc, item) => {
      return acc + (item.price || 0) * (item.quantity || 1);
    }, 0);
    setTotal(Math.round(totalPrice));
  };

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const value = {
    cart,
    loading,
    fetchCart,
    addToCart,
    updateCart,
    removeFromCart,
    totalItems,
    total,
    setTotal,
    recalcTotal,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
