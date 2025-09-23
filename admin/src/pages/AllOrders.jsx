import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu từ API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy carts
        const cartsRes = await fetch("https://fakestoreapi.com/carts");
        const carts = await cartsRes.json();

        // Lấy products
        const productsRes = await fetch("https://fakestoreapi.com/products");
        const products = await productsRes.json();

        // Lấy users
        const usersRes = await fetch("https://fakestoreapi.com/users");
        const users = await usersRes.json();

        // Map dữ liệu
        const mappedOrders = carts.slice(0, 5).map((cart) => {
          const user = users.find((u) => u.id === cart.userId);
          const customerName = `${user?.name?.firstname ?? ""} ${user?.name?.lastname ?? ""}`;
          const email = user?.email ?? "unknown";
          const phone = user?.phone ?? "N/A";

          const orderProducts = cart.products.map((p) => {
            const productInfo = products.find((prod) => prod.id === p.productId);
            return {
              id: productInfo?.id,
              name: productInfo?.title,
              price: productInfo?.price,
              img: productInfo?.image,
              quantity: p.quantity,
            };
          });

          // Tính tổng
          const total = orderProducts.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
          );

          return {
            id: "GH" + String(cart.id).padStart(3, "0"),
            customer: customerName,
            email,
            phone,
            products: orderProducts,
            total: total.toLocaleString("en-US") + "$",
          };
        });

        setOrders(mappedOrders);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = (orderId) => {
    toast.success(`Order ${orderId} approved to deliver!`);
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📋</span>
        <h1 className="text-2xl font-bold">Order Lists</h1>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 text-sm font-bold uppercase border">Order ID</th>
              <th className="p-3 text-sm font-bold uppercase border">Customer</th>
              <th className="p-3 text-sm font-bold uppercase border">Email & PhoneNumb.</th>
              <th className="p-3 text-sm font-bold uppercase border">Products</th>
              <th className="p-3 text-sm font-bold uppercase border">Total</th>
              <th className="p-3 text-sm font-bold uppercase border">Operate</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="p-3 border font-semibold">{order.id}</td>
                <td className="p-3 border">{order.customer}</td>
                <td className="p-3 border">
                  <div>{order.email}</div>
                  <div>{order.phone}</div>
                </td>
                <td className="p-3 border">
                  {order.products.map((p, idx) => (
                    <div key={idx} className="flex gap-3 mb-2">
                      <img
                        src={p.img}
                        alt={p.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p>{p.name}</p>
                        <p className="text-sm text-gray-500">
                          Số lượng: {p.quantity} | Đơn giá: {p.price.toLocaleString("vi-VN")}đ
                        </p>
                      </div>
                    </div>
                  ))}
                </td>
                <td className="p-3 border font-bold text-blue-600">{order.total}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleApprove(order.id)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Approve to Deliver
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
