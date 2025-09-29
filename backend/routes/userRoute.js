import express from "express";
import {
  changePassword,
  getAllUsers,
  getSingleUser,
  loginUser,
  registerUser,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/allusers", getAllUsers);
userRouter.get("/user/:id", getSingleUser);
userRouter.put("/update/:id", updateUser);
userRouter.put("/change-password/:id", changePassword);

export default userRouter;
