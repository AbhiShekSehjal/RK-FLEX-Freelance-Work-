import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
const port = 9000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(cookieParser());
app.use(express.json());

dotenv.config();

connectDB();

import allWallsRoute from "./routes/allWallsRoute.js";
import authUserRoute from "./routes/authUserRoute.js"
import orderRoute from "./routes/orderRoute.js";

app.use("/api", allWallsRoute);
app.use("/api/auth", authUserRoute);
app.use("/api/order",orderRoute);


// 404 Not Found
app.use((req, res, next) => {
    res.status(404).json({ message: "API route not found" });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Something went wrong" });
});

app.listen(port, () => {
    console.log("server is listening on :", port);
})