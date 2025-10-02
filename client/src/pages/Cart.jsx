import React, { useContext, useEffect, useMemo } from "react";
import { Plus, Minus, X } from "lucide-react";
import { CartContext } from "../contexts/CartContext";
import { ProductContext } from "../contexts/ProductContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, updateCart, removeFromCart, recalcTotal, total } =
    useContext(CartContext);
  const { products, getCategoryColor } = useContext(ProductContext);
  const navigate = useNavigate();

  // Ghép thông tin sản phẩm vào cartItem
  const cartItems = useMemo(
    () =>
      cart.map((item) => ({
        productId: item.productId?._id,
        title: item.productId?.title || "Unknown",
        quantity: item?.quantity || 1,
        category: item.productId?.category || "Unknown",
        price: item.productId?.price || 0,
        image: item.productId?.image || "/placeholder.png",
      })),
    [cart]
  );

  // Cập nhật tổng tiền khi cartItems thay đổi
  useEffect(() => {
    recalcTotal(cartItems);
  }, [cartItems, recalcTotal]);

  if (products.length === 0) return <p>Loading products...</p>;

  return (
    <div className="mx-auto p-6 ">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

      <div className="grid gap-4 border rounded-lg p-4 bg-white shadow">
        <div className="grid grid-cols-[0.5fr_2.5fr_1fr_1fr_0.5fr] gap-5 text-gray-700 font-medium border-b pb-2">
          <div>Product</div>
          <div>Name</div>
          <div>Price</div>
          <div>Quantity</div>
          <div></div>
        </div>

        {cartItems.map((item, idx) => (
          <div
            key={`${item.productId}-${idx}`}
            className="grid grid-cols-[0.5fr_2.5fr_1fr_1fr_0.5fr] gap-5 items-center border-b py-3 hover:bg-gray-50 transition"
          >
            {/* Image */}
            <div>
              <img
                src={item.image}
                alt={item.title}
                className="w-30 h-30 object-contain rounded-lg"
              />
            </div>

            {/* Name + Category */}
            <div className="flex flex-col gap-1 overflow-hidden">
              <span className="font-medium text-gray-800 truncate">
                {item.title}
              </span>
              <span
                className={`text-sm px-2 py-1 rounded-full w-max ${getCategoryColor(
                  item.category
                )}`}
              >
                {item.category}
              </span>
            </div>

            {/* Price */}
            <div className="font-semibold text-blue-600">{item.price} VND</div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <button
                className="p-1 border rounded transition bg-red-500"
                onClick={() =>
                  updateCart(item.productId, Math.max(1, item.quantity - 1))
                }
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-1 border rounded">{item.quantity}</span>
              <button
                className="p-1 border rounded transition bg-green-500"
                onClick={() => updateCart(item.productId, item.quantity + 1)}
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Remove */}
            <div>
              <button
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition flex items-center gap-1"
                onClick={() => removeFromCart(item.productId)}
              >
                <X size={16} />
              </button>
            </div>
          </div>
        ))}

        {/* Total + Checkout */}
        <div className="flex justify-end mt-4">
          <div className="text-right">
            <p className="text-lg font-medium">Total: {total} VND</p>
            <button
              onClick={() => {
                if (total <= 0) {
                  toast.error("Not product to checkout");
                  return;
                } else {
                  navigate("/order");
                }
              }}
              className="mt-3 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
