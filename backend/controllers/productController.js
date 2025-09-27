import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const { title, price, description, category, rating } = req.body;

    // Parse rating nếu là string
    let ratingData = {};
    try {
      ratingData =
        typeof rating === "string" ? JSON.parse(rating) : rating || {};
    } catch (e) {
      ratingData = {};
    }

    // kiểm tra file
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    const imageUrl = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "image",
    });

    const productData = {
      title,
      price: Number(price),
      description,
      category,
      image: imageUrl.secure_url,
      rating: {
        rate: Number(ratingData.rate) || 0,
        count: Number(ratingData.count) || 0,
      },
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    res.json({ product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// update single product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedata = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      updatedata,
      {
        new: true,
      }
    );

    res.json({ product: updatedProduct });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct, updateProduct };
