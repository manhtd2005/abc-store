import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  updateProduct,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.get("/list", listProduct);
productRouter.get("/single/:id", singleProduct);
productRouter.post("/add", upload.single("image"), addProduct);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/remove/:id", removeProduct);

export default productRouter;
