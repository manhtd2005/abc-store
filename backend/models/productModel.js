import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: { type: String, require: true },
    price: { type: Number, require: true },
    destination: { type: Number, require: true },
    category: { type: String, require: true },
    image: { type: String, require: true },
    rating: {
        rate: { type: Number, require: true },
        count: { type: Number, require: true },
    },
});

const productModel =
    mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;
