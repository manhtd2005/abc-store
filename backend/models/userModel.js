import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: { type: Number, required: true, default: 1 },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: {
      firstname: { type: String, default: "" },
      lastname: { type: String, default: "" },
    },
    phone: { type: Number },
    address: {
      city: { type: String, default: "" },
      street: { type: String, default: "" },
      number: { type: Number },
      zipcode: { type: String, default: "" },
    },
    cartData: { type: [cartItemSchema], default: [] },
  },
  { minimize: false }
);

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
