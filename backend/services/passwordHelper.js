import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const generateAuthToken = (user) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET,{ expiresIn: '30d' });
  return token;
};

export const comparePassword = async function (password, userPassword) {
  return await bcrypt.compare(password, userPassword);
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};