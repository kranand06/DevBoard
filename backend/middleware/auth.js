import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const checkAuth = async (req, res, next) => {
  try {
    if (req.cookies.token || req.headers.authorization?.startsWith("Bearer")) {
      const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;
      if (!token) {
        return res
          .status(401)
          .json({ message: "Unauthorized, no token provided" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
      return next();
    } else {
      return res.status(401).json({ message: "Unauthorized, no token provided" });
    }
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized, invalid token" });
  }
};
