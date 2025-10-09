import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
  quantity: Number,
  unitPrice: Number,
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },

  items: [OrderItemSchema],
  contact: {
    email: { type: String, default: "" },
    fullname: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  total: { type: Number, require: true },
  paymentMethod: { type: String, require: true },
  date: { type: Number, default: Date.now },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);
export default orderModel;
