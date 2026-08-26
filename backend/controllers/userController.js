import User from "../models/userSchema.js";
import WidgetConfig from "../models/widgetSchema.js";
import Productivity from "../models/productivitySchema.js";
import { hashPassword } from "../services/passwordHelper.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provide all required fields" });
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
      username,
      email,
      password: hashedPassword,
    });

    if (user) {
      await WidgetConfig.create({
        userId: user._id,
        widgets: [
          { id: "github", x: 0, y: 0, w: 6, h: 4, isVisible: true },
          { id: "leetcode", x: 6, y: 0, w: 6, h: 4, isVisible: true },
          { id: "pomodoro", x: 0, y: 4, w: 4, h: 4, isVisible: true },
          { id: "todos", x: 4, y: 4, w: 8, h: 4, isVisible: true },
        ],
      });
      await Productivity.create({ userId: user._id });
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const loginUser = async (req, res) => {
    try{
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: "Please provide all required fields" });
        }
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateAuthToken(user),
        });
    }catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
