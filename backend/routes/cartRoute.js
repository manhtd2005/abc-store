import express from "express";
import {
  addToCart,
  getUserCart,
  removeFromCart,
  updateCart,
} from "../controllers/cartController.js";
import authUser from "../middleware/authUser.js";

const cartRouter = express.Router();

cartRouter.get("/get", authUser, getUserCart);
cartRouter.post("/add", authUser, addToCart);
cartRouter.post("/update/:productId", authUser, updateCart);
cartRouter.delete("/delete/:productId", authUser, removeFromCart);

export default cartRouter;
