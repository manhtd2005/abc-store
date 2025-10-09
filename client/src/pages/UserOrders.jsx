import React, { useEffect, useState, useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";
import { AuthContext } from "../contexts/AuthContext";
import { ProductContext } from "../contexts/ProductContext";
import formatDate from "../utils/formatDate";

export default function UserOrders() {
  const { user } = useContext(AuthContext);
  const { orders, loading, fetchUserOrders } = useContext(OrderContext);
  const { products = [] } = useContext(ProductContext) || {};
  const [localOrders, setLocalOrders] = useState([]);

  useEffect(() => {
    const uid =
      user?._id ||
      user?.id ||
      (() => {
        try {
          const s = localStorage.getItem("user");
          return s ? JSON.parse(s)._id || JSON.parse(s).id : null;
        } catch {
          return null;
        }
      })();
    if (uid) fetchUserOrders(uid);
  }, [user, fetchUserOrders]);

  useEffect(() => {
    setLocalOrders(orders || []);
  }, [orders]);

  if (loading) return <div className="p-6">Loading orders...</div>;

  const placeholder = "/placeholder.png";

  const getProductFromItem = (item) => {
    if (!item) return { title: "Product", image: placeholder, price: 0 };

    // if populated object
    if (item.product && typeof item.product === "object") {
      const p = item.product;
      return {
        title: p.title || p.name || String(p._id || p.id),
        image: p.image || p.img || placeholder,
        price: item.unitPrice || p.price || 0,
      };
    }

    if (item.productId && typeof item.productId === "object") {
      const p = item.productId;
      return {
        title: p.title || p.name || String(p._id || p.id),
        image: p.image || p.img || placeholder,
        price: item.unitPrice || p.price || 0,
      };
    }

    // item.product or item.productId could be id string — try to find in ProductContext
    const idCandidate = item.product || item.productId;
    if (idCandidate) {
      const found = products.find(
        (prod) =>
          prod._id === idCandidate ||
          prod.id === idCandidate ||
          String(prod._id) === String(idCandidate)
      );
      if (found)
        return {
          title: found.title || found.name,
          image: found.image || found.img || placeholder,
          price: item.unitPrice || found.price || 0,
        };
    }

    // fallback to any inline fields
    return {
      title:
        item.name ||
        item.title ||
        item.productName ||
        String(item.product || item.productId || "Product"),
      image: item.image || item.img || item.productImage || placeholder,
      price: item.unitPrice || 0,
    };
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📋</span>
        <h1 className="text-2xl font-bold">My Orders</h1>
      </div>

      {(!localOrders || localOrders.length === 0) && (
        <div className="text-gray-500">You have no orders yet.</div>
      )}

      {localOrders && localOrders.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {localOrders.map((order) => (
            <div
              key={order._id || order.id}
              className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition flex flex-col"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium text-gray-800">
                    Order #{(order._id || order.id || "").slice(-8)}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {formatDate(order.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-blue-600">
                    {Number(order.total || 0).toLocaleString()} VND
                  </p>
                  <p className="text-xs text-gray-500">{order.paymentMethod}</p>
                </div>
              </div>

              <div className="mb-3">
                <div className="font-medium text-sm mb-1">
                  {order.contact?.fullname ||
                    `${user?.name?.firstname || ""} ${
                      user?.name?.lastname || ""
                    }`.trim()}
                </div>
                <div className="text-xs text-gray-500">
                  {order.contact?.email || user?.email}
                </div>
                <div className="text-xs text-gray-500">
                  {order.contact?.phone}
                </div>
                <div className="text-xs text-gray-500">
                  {order.contact?.address}
                </div>
              </div>

              <div className="flex-1 mb-3 overflow-y-auto space-y-2">
                {(order.items || []).map((p, idx) => {
                  const prod = getProductFromItem(p);
                  return (
                    <div key={idx} className="flex gap-3 items-center">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-14 h-14 rounded object-cover flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.src = placeholder;
                        }}
                      />
                      <div className="min-w-0">
                        <p className="text-sm truncate">{prod.title}</p>
                        <p className="text-xs text-gray-500">
                          Qty: {p.quantity || 1} |{" "}
                          {(prod.price || 0).toLocaleString()} VND
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
