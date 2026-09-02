import User from "../models/userSchema.js";
import Productivity from "../models/productivitySchema.js";
import Platform from "../models/platformSchema.js";
import {
  hashPassword,
  generateAuthToken,
  comparePassword,
} from "../services/passwordService.js";

export const registerUser = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!username || !email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }
    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      await Platform.create({ userId: user._id });
      await Productivity.create({ userId: user._id });
      const token = generateAuthToken(user._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      res.status(201).json({
        user: {
          _id: user._id,
          username: user.username,
          name: user.name,
          email: user.email,
        },
        token: token,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const user = await User.findOne({
      $or: [{ email: username }, { username: username }],
    }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Please check user credentials" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = generateAuthToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const platform = await Platform.findOne({ userId: req.user._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      user: {
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
      platform: platform.handle,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
