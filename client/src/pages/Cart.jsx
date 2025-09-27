import React from "react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  // Phần này sẽ là nơi xử lý dữ liệu giỏ hàng thực tế sau này
  // const cartItems = useSelector(state => state.cart.items);
  // const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartItems = []; // Tạm thời để mảng rỗng để hiển thị giao diện khi không có sản phẩm

  return (
    <div className="container mx-auto my-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <ShoppingCart size={32} /> Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-10 bg-white rounded-lg shadow-lg text-center">
          <ShoppingCart size={64} className="text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg mb-4 font-semibold">
            Your cart is empty.
          </p>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet. Go ahead &
            explore some categories!
          </p>
          <Link
            to="/collection"
            className="bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-700 transition duration-300 transform hover:scale-105"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="lg:flex lg:gap-8">
          {/* Cart Items List */}
          <div className="lg:w-2/3 space-y-6">
            {/* Đây là nơi render danh sách sản phẩm.
                            Khi có sản phẩm, bạn sẽ dùng .map() để hiển thị.
                            Ví dụ:
                            {cartItems.map(item => (
                                <CartItem key={item.id} item={item} />
                            ))}
                        */}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 bg-white rounded-2xl shadow p-6 lg:mt-0 mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="border-t pt-4 mt-4 flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>$0.00</span>
              </div>
            </div>
            <button className="w-full bg-gray-400 text-white py-3 rounded-lg mt-6 cursor-not-allowed">
              Proceed to Checkout
            </button>
            <Link
              to="/collection"
              className="block text-center text-gray-600 mt-4 hover:text-gray-900 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
