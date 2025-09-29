import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

// Tạo token kèm userId
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" }); // token hết hạn sau 7 ngày
};

// Route for user login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Tìm user theo username
    const user = await userModel.findOne({ username });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // Tạo token
    const token = createToken(user._id);

    // Trả về luôn thông tin user (trừ password)
    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //  Chỉ kiểm tra username có tồn tại không
    const exists = await userModel.findOne({ username });
    if (exists) {
      return res.json({ success: false, message: "Username already exists" });
    }

    //  Kiểm tra định dạng email hợp lệ (vẫn nên có)
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    //  Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    //  Mã hoá mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  Tạo user mới
    const newUser = new userModel({
      email,
      username,
      password: hashedPassword,
      name: { firstname: "", lastname: "" },
      phone: "",
      address: { city: "", street: "", number: "", zipcode: "" },
    });

    const user = await newUser.save();

    //  Tạo token
    const token = createToken(user._id);

    //  Trả về token + user
    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find({}, "-password");
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for 1 user
const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findById(id, "-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Change infomation user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params; // lấy id user từ URL
    const { email, password, name, phone, address } = req.body;

    // Tìm user theo id
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Cập nhật các trường (trừ username)
    if (email) user.email = email;

    if (name) {
      if (name.firstname !== undefined) user.name.firstname = name.firstname;
      if (name.lastname !== undefined) user.name.lastname = name.lastname;
    }

    if (phone !== undefined) user.phone = phone;

    if (address) {
      if (address.city !== undefined) user.address.city = address.city;
      if (address.street !== undefined) user.address.street = address.street;
      if (address.number !== undefined) user.address.number = address.number;
      if (address.zipcode !== undefined) user.address.zipcode = address.zipcode;
    }

    // Lưu thay đổi
    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        address: updatedUser.address,
      },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Change password
const changePassword = async (req, res) => {
  try {
    const { id } = req.params; // lấy id từ URL
    const { oldPassword, newPassword } = req.body;

    //  Tìm user theo id
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    //  So sánh mật khẩu cũ
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Old password is incorrect" });
    }

    //  Kiểm tra độ dài mật khẩu mới
    if (newPassword.length < 8) {
      return res.json({
        success: false,
        message: "New password must be at least 8 characters",
      });
    }

    //  Hash mật khẩu mới
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    //  Cập nhật password trong DB
    user.password = hashedNewPassword;
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  changePassword,
};
