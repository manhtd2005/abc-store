import express from "express";
import authUser from "../middleware/authUser.js";
import {
  allOrders,
  placeOrderCOD,
  placeOrderMBBank,
  placeOrderTechcombank,
  userOrders,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/cod", authUser, placeOrderCOD);
orderRouter.post("/mbbank", authUser, placeOrderMBBank);
orderRouter.post("/techcombank", authUser, placeOrderTechcombank);

orderRouter.get("/allOrders", allOrders);
orderRouter.get("/userOrders/:userId", userOrders);

export default orderRouter;
