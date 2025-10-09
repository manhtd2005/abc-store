import React, { useEffect, useState, useContext } from "react";
import { Clock, ArrowLeft, CreditCard } from "lucide-react";
import mbbankQR from "../assets/qr-mbbank.jpg";
import techcombankQR from "../assets/qr-techcombank.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import generateRandomCode from "../utils/generateRandomCode";
import { OrderContext } from "../contexts/OrderContext";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";

const bankInfoByMethod = {
  MBBank: {
    image: mbbankQR,
    bankName: "MB Bank",
    accountNumber: "0375833080",
    fullName: "TRẦN ĐỨC MẠNH",
  },
  Techcombank: {
    image: techcombankQR,
    bankName: "Techcombank",
    accountNumber: "19072398904011",
    fullName: "TRẦN ĐỨC MẠNH",
  },
};

const Verify = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { placeOrder } = useContext(OrderContext);
  const { cart } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const state = location.state || {};
  const method = state.method || "MBBank";
  const payloadFromNav = state.payload || {};

  const [timeLeft, setTimeLeft] = useState(5 * 60);
  const [transferCode, setTransferCode] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTransferCode(generateRandomCode());
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;

  const bankInfo = bankInfoByMethod[method] || bankInfoByMethod.MBBank;

  // Build payload fallback to cart + user if navigation state not provided
  const buildFallbackPayload = () => {
    const items =
      payloadFromNav.items && payloadFromNav.items.length
        ? payloadFromNav.items
        : (cart || []).map((it) => ({
            product: it.productId?._id || it.productId,
            quantity: it.quantity || 1,
            unitPrice: it.productId?.price || it.unitPrice || it.price || 0,
          }));

    const contact = payloadFromNav.contact || {
      email: user?.email || "",
      fullname: (
        (user?.name?.firstname || "") +
        " " +
        (user?.name?.lastname || "")
      ).trim(),
      address: [
        user?.address?.number,
        user?.address?.street,
        user?.address?.city,
        user?.address?.zipcode,
      ]
        .filter(Boolean)
        .join(", "),
      phone: user?.phone || "",
    };

    const userId = payloadFromNav.userId || user?._id || user?.id;
    const total =
      payloadFromNav.total ||
      (cart || []).reduce(
        (acc, it) =>
          acc + (it.productId?.price || it.price || 0) * (it.quantity || 1),
        0
      );

    return { userId, items, contact, total };
  };

  const onConfirmPayment = async () => {
    const payload = buildFallbackPayload();
    if (!payload.items || payload.items.length === 0) {
      alert("No product to payment");
      return;
    }
    setLoading(true);
    try {
      const contact = { ...(payload.contact || {}), transferCode };
      const res = await placeOrder({
        method,
        userId: payload.userId,
        items: payload.items,
        contact,
        total: payload.total,
      });

      if (res?.success) {
        navigate("/successpayment", {
          state: {
            bankName: bankInfo.bankName,
            accountNumber: bankInfo.accountNumber,
            fullName: bankInfo.fullName,
            amount: payload.total,
            confirmCode: transferCode,
          },
        });
      } else {
        alert(res?.message || "Payment confirmation failed");
      }
    } catch (err) {
      console.error("Confirm payment error:", err);
      alert(err?.message || "Lỗi khi xác nhận thanh toán");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl grid grid-cols-[1fr_2fr] overflow-hidden">
        <div className="bg-gray-900 text-white p-8 flex flex-col justify-between">
          <img src={bankInfo.image} className="w-full" alt="QR" />

          <div className="flex items-center mt-10 gap-3 justify-center">
            <Clock size={40} className=" text-yellow-400" />
            <p className="text-3xl font-semibold ">{formattedTime}</p>
          </div>
        </div>

        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <CreditCard className="text-blue-600" /> Bank Information
          </h2>

          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600 font-medium">Bank Name:</span>
              <span className="font-semibold text-gray-900">
                {bankInfo.bankName}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600 font-medium">Account Number:</span>
              <span className="font-semibold text-gray-900">
                {bankInfo.accountNumber}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600 font-medium">Account Holder:</span>
              <span className="font-semibold text-gray-900">
                {bankInfo.fullName}
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600 font-medium">Amount:</span>
              <span className="font-semibold text-green-600">
                {(buildFallbackPayload().total || 0).toLocaleString()} VND
              </span>
            </div>

            <div className="flex justify-between items-center border-b pb-2">
              <span className="text-gray-600 font-medium">
                Transfer Content:
              </span>
              <span className="font-semibold text-gray-900">
                {transferCode}
              </span>
            </div>

            <div className="flex gap-4 mt-8">
              <Link
                to="/order"
                className="flex-1 flex items-center justify-center gap-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 rounded-lg transition"
              >
                <ArrowLeft size={18} /> Back
              </Link>

              <button
                type="button"
                onClick={onConfirmPayment}
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition disabled:opacity-60"
              >
                {loading ? "Processing..." : "Confirm Payment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
