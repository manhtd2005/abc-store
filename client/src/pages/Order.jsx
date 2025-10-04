import React, { useContext, useEffect, useState } from "react";
import { Edit, QrCode, ScanQrCode, Truck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

const Order = () => {
  const navigate = useNavigate();
  const { cart, total, recalcTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [activePayment, setActivePayment] = useState("COD");

  // Ghép thông tin sản phẩm vào cartItem
  const cartItems = cart.map((item) => ({
    productId: item.productId?._id,
    title: item.productId?.title || "Unknown",
    quantity: item?.quantity || 1,
    category: item.productId?.category || "Unknown",
    price: item.productId?.price || 0,
    image: item.productId?.image || "/placeholder.png",
  }));

  useEffect(() => {
    recalcTotal(cartItems);
  }, [cartItems, recalcTotal]);

  const paymentMethods = [
    {
      name: "COD",
      icon: <Truck size={20} />,
      activeColor: "bg-green-500 text-white border-green-500",
    },
    {
      name: "MB Bank",
      icon: <QrCode size={20} />,
      activeColor: "bg-blue-500 text-white border-blue-500",
    },
    {
      name: "Techcombank",
      icon: <ScanQrCode size={20} />,
      activeColor: "bg-red-500 text-white border-red-500",
    },
  ];

  return (
    <div className="mb-30 mx-auto p-6 bg-gray-50 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Order Summary</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Payment Method */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Payment Method</h3>
            <div className="flex gap-4">
              {paymentMethods.map((method) => (
                <button
                  onClick={() => setActivePayment(method.name)}
                  key={method.name}
                  className={`flex items-center gap-2 px-3 py-2 border rounded transition ${
                    activePayment === method.name
                      ? method.activeColor
                      : "hover:bg-gray-100"
                  }`}
                >
                  {method.icon}
                  <span>{method.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div className="bg-white p-4 rounded-lg shadow-sm space-y-1 relative">
            <h3 className="font-semibold text-gray-700 mb-2">
              Customer Information
            </h3>
            <p>
              <span className="font-medium">Fullname: </span>
              {user?.name?.firstname} {user?.name?.lastname}
            </p>
            <p>
              <span className="font-medium">Email: </span>
              {user?.email}
            </p>
            <p>
              <span className="font-medium">Phone: </span>
              {user?.phone}
            </p>
            <p>
              <span className="font-medium">Address: </span>
              {[
                user?.address?.number,
                user?.address?.street,
                user?.address?.city,
                user?.address?.zipcode,
              ]
                .filter(Boolean)
                .join(", ")}
            </p>

            <button
              onClick={() => navigate("/information")}
              className="absolute top-0 right-4 flex items-center gap-2 text-blue-600 text-[18px]"
            >
              <Edit size={30} />
              Edit
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4">
          <h3 className="font-semibold text-gray-700 mb-2">Your Order</h3>
          <div className="space-y-3">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="grid items-center grid-cols-[0.5fr_2.5fr_1fr] gap-4 border-b pb-2 last:border-b-0 last:pb-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-gray-500">x{item.quantity}</p>
                </div>
                <p className="font-semibold text-blue-600">
                  {(item.price * item.quantity).toLocaleString()} VND
                </p>
              </div>
            ))}
          </div>

          <div className="text-right font-bold text-lg mt-2">
            Total: {total.toLocaleString()} VND
          </div>

          <button className="w-full mt-3 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
