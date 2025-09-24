import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      category,
      rating: { rate, count },
    } = req.body;

    let image = req.files.image;

    const imageUrl = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });

    const productData = {
      title,
      price: Number(price),
      description,
      category,
      image: imageUrl,
      rating: {
        rate,
        count,
      },
    };

    const product = new productModel(productData);
    await product.save();
    res.json({ success: true, message: "Product Added success" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for list product
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for removing product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
