import { createUser, findUserByEmail } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import { protect } from "../middleware/authMiddleware.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Please fill all fields",
    });
  }

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await createUser(name, email, hashedPassword);

  res.status(201).json({
    message: "User registered successfully",
    token: generateToken(user.insertId),
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmail(email);

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  res.status(200).json({
    message: "Login successful",
    token: generateToken(user.id),
  });
};

export const getProfile = (req, res) => {
  res.json({
    message: "Protected profile route",
    user: req.user,
  });
};
