import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import devRouter from "./routes/devRoutes.js";
import widgetRouter from "./routes/widgetRoute.js";
import productivityRouter from "./routes/productivityRoute.js";

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

app.use("/api/users", userRouter);
app.use("/api/dev", devRouter);
app.use("/api/widgets", widgetRouter);
app.use("/api/productivity", productivityRouter);

export default app;