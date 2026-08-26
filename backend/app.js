import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

const app = express();

app.use(express.json());

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(cookieParser());

//connect to database
connectDB();


//api
app.get("/", (req, res) => {
  res.send("Hello, World!");
});


app.get("/health", (req, res) => {
  res.send("Health check passed!");
});

export default app;