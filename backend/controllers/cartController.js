import mongoose from "mongoose";
import userModel from "../models/userModel.js";
import Product from "../models/productModel.js"; // <-- import Product để populate

// GET: Lấy giỏ hàng của user hiện tại
export const getUserCart = async (req, res) => {
  try {
    const user = await userModel
      .findById(req.user.id)
      .populate("cartData.productId"); // populate Product info

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST: Thêm sản phẩm vào giỏ
export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid productId" });
    }

    const qty = quantity && quantity > 0 ? quantity : 1;

    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const productObjectId = new mongoose.Types.ObjectId(productId);

    const existingItem = user.cartData.find(
      (item) => item.productId?.toString() === productObjectId.toString()
    );

    if (existingItem) {
      existingItem.quantity += qty;
    } else {
      user.cartData.push({ productId: productObjectId, quantity: qty });
    }

    await user.save();
    await user.populate("cartData.productId"); // populate lại sau khi lưu

    res.json({
      success: true,
      message: "Added to cart",
      cartData: user.cartData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// PATCH: Cập nhật số lượng sản phẩm
export const updateCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!quantity || quantity <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quantity" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid productId" });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const existingItem = user.cartData.find(
      (item) => item.productId.toString() === productId
    );

    if (!existingItem) {
      return res
        .status(404)
        .json({ success: false, message: "Product not in cart" });
    }

    existingItem.quantity = quantity;

    await user.save();
    await user.populate("cartData.productId");

    res.json({
      success: true,
      message: "Cart updated",
      cartData: user.cartData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE: Xóa sản phẩm khỏi giỏ
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid productId" });
    }

    const user = await userModel.findById(req.user.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const beforeLength = user.cartData.length;
    user.cartData = user.cartData.filter(
      (item) => item.productId.toString() !== productId
    );

    if (beforeLength === user.cartData.length) {
      return res
        .status(404)
        .json({ success: false, message: "Product not in cart" });
    }

    await user.save();
    await user.populate("cartData.productId");

    res.json({
      success: true,
      message: "Removed from cart",
      cartData: user.cartData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
