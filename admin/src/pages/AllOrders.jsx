import React, { useEffect, useState, useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";
import { ProductContext } from "../contexts/ProductContext";

const placeholder = "/placeholder.png";
const formatDate = (ts) => (ts ? new Date(ts).toLocaleString("vi-VN") : "N/A");

export default function AllOrders() {
  const { orders, loading, fetchAllOrders } = useContext(OrderContext);
  const { products, fetchProducts } = useContext(ProductContext) || {};
  const [localOrders, setLocalOrders] = useState([]);

  useEffect(() => {
    fetchAllOrders();
    // ensure products available to render product titles/images
    if (typeof fetchProducts === "function") fetchProducts();
  }, [fetchAllOrders, fetchProducts]);

  useEffect(() => {
    setLocalOrders(orders || []);
  }, [orders]);

  const getProductInfo = (productRef) => {
    if (!productRef) return { title: "Product", img: placeholder, price: 0 };
    // productRef may be populated object or an id string
    if (typeof productRef === "object") {
      return {
        title:
          productRef.title ||
          productRef.name ||
          String(productRef._id || productRef.id),
        img: productRef.image || productRef.img || placeholder,
        price: productRef.price || 0,
      };
    }
    // try find in products context
    const found =
      (products || []).find(
        (p) =>
          p._id === productRef ||
          p.id === productRef ||
          String(p._id) === String(productRef)
      ) || null;
    if (found) {
      return {
        title: found.title || found.name || String(found._id || found.id),
        img: found.image || found.img || placeholder,
        price: found.price || 0,
      };
    }
    return { title: String(productRef), img: placeholder, price: 0 };
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📋</span>
        <h1 className="text-2xl font-bold">Order Lists</h1>
      </div>

      {(!localOrders || localOrders.length === 0) && (
        <div className="text-gray-500">No orders found.</div>
      )}

      {localOrders && localOrders.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <div className="min-w-full">
            <div className="grid grid-cols-12 gap-4 bg-gray-100 text-sm font-bold uppercase p-3 border-b">
              <div className="col-span-2">Customer</div>
              <div className="col-span-2">Contact</div>
              <div className="col-span-5">Products</div>
              <div className="col-span-1">Total</div>
              <div className="col-span-1">Payment</div>
              <div className="col-span-1">Date</div>
            </div>

            <div>
              {localOrders.map((order) => (
                <div
                  key={order._id || order.id}
                  className="grid grid-cols-12 gap-4 items-start p-4 border-b hover:bg-gray-50"
                >
                  <div className="col-span-2">
                    <div className="font-medium">
                      {order.contact?.fullname || "Guest"}
                    </div>
                    <div className="text-xs text-gray-500">
                      #{(order._id || order.id || "").slice(-8)}
                    </div>
                  </div>

                  <div className="col-span-2 text-xs text-gray-600">
                    <div>{order.contact?.email}</div>
                    <div>+{order.contact?.phone}</div>
                  </div>

                  <div className="col-span-5">
                    {(order.items || []).map((it, idx) => {
                      const prod = getProductInfo(it.product || it.productId);
                      return (
                        <div key={idx} className="flex gap-3 mb-2 items-center">
                          <img
                            src={prod.img}
                            className="w-12 h-12 rounded object-cover flex-shrink-0"
                          />
                          <div>
                            <div className="text-sm">{prod.title}</div>
                            <div className="text-xs text-gray-500">
                              Quantity: {it.quantity || 1} |{" "}
                              {it.unitPrice.toLocaleString()}VND
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="col-span-1 font-semibold text-blue-600">
                    {order.total.toLocaleString()}VND
                  </div>

                  <div className="col-span-1 text-sm">
                    {order.paymentMethod}
                  </div>

                  <div className="col-span-1 text-sm text-gray-600">
                    {formatDate(order.date)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
