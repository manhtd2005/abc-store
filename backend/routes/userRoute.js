import express from "express";
import {
  changePassword,
  deleteUser,
  getAllUsers,
  getSingleUser,
  loginUser,
  registerUser,
  registerUserByAdmin,
  updateUser,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/registeruseradmin", registerUserByAdmin);
userRouter.post("/login", loginUser);
userRouter.get("/allusers", getAllUsers);
userRouter.get("/user/:id", getSingleUser);
userRouter.put("/update/:id", updateUser);
userRouter.put("/change-password/:id", changePassword);
userRouter.delete("/remove/:userId", deleteUser);

export default userRouter;
