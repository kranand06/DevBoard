import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const DB_URL = process.env.DB_URL || "mongodb://localhost:27017/devboard";

async function connectDB() {
  await mongoose.connect(DB_URL).then(() => {
        console.log("MongoDB connected");
      }).catch(err => {
        console.error("MongoDB connection error:", err);
      });
}

export default connectDB;