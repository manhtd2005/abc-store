import orderModel from "../models/orderModel.js";

/**
 * Normalize phone: keep digits only, return null if no digits
 */
const normalizePhone = (phone) => {
  if (!phone) return null;
  const digits = String(phone).replace(/\D/g, "");
  return digits.length ? digits : null;
};

// helper to create & save order
const createAndSaveOrder = async ({
  userId,
  items,
  contact,
  total,
  paymentMethod,
}) => {
  const order = new orderModel({
    userId,
    items,
    contact,
    total,
    paymentMethod,
    date: Date.now(),
  });
  return await order.save();
};

const getUserIdFromReq = (req) => {
  return (
    req.body?.userId || req.params?.userId || req.user?.id || req.user?._id
  );
};

// simple validation for order payload
const validateOrderPayload = ({ userId, items, total, contact }) => {
  if (!userId) return "Missing userId";
  if (!Array.isArray(items) || items.length === 0)
    return "Items must be a non-empty array";
  if (typeof total !== "number") return "Total must be a number";
  if (!contact || typeof contact !== "object")
    return "Contact info is required";
  const phone = normalizePhone(contact.phone || contact.phoneNumber || "");
  if (!phone || phone.length < 7 || phone.length > 15)
    return "Contact phone is invalid";
  return null;
};

// Placing orders using COD method
const placeOrderCOD = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    const { items, contact = {}, total } = req.body;

    // normalize phone into contact.phone
    contact.phone = normalizePhone(contact.phone) || contact.phone;

    const invalid = validateOrderPayload({ userId, items, total, contact });
    if (invalid)
      return res.status(400).json({ success: false, message: invalid });

    const order = await createAndSaveOrder({
      userId,
      items,
      contact,
      total,
      paymentMethod: "COD",
    });

    return res
      .status(201)
      .json({ success: true, message: "Order placed (COD)", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Placing orders using MBBank
const placeOrderMBBank = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    const { items, contact = {}, total } = req.body;

    contact.phone = normalizePhone(contact.phone) || contact.phone;

    const invalid = validateOrderPayload({ userId, items, total, contact });
    if (invalid)
      return res.status(400).json({ success: false, message: invalid });

    const order = await createAndSaveOrder({
      userId,
      items,
      contact,
      total,
      paymentMethod: "MBBank",
    });

    return res
      .status(201)
      .json({ success: true, message: "Order placed (MBBank)", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Placing orders using Techcombank
const placeOrderTechcombank = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    const { items, contact = {}, total } = req.body;

    contact.phone = normalizePhone(contact.phone) || contact.phone;

    const invalid = validateOrderPayload({ userId, items, total, contact });
    if (invalid)
      return res.status(400).json({ success: false, message: invalid });

    const order = await createAndSaveOrder({
      userId,
      items,
      contact,
      total,
      paymentMethod: "Techcombank",
    });

    return res
      .status(201)
      .json({ success: true, message: "Order placed (Techcombank)", order });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// All orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// User Orders data for frontend
const userOrders = async (req, res) => {
  try {
    const userId = getUserIdFromReq(req);
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing userId" });
    }

    const orders = await orderModel.find({ userId }).sort({ date: -1 });
    return res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export {
  createAndSaveOrder,
  placeOrderCOD,
  placeOrderMBBank,
  placeOrderTechcombank,
  allOrders,
  userOrders,
};
