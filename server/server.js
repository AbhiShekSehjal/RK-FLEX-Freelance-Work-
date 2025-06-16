import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./lib/db.js";
import cookieParser from "cookie-parser";
const app = express();
const port = 9000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());

dotenv.config();

connectDB();

import allWallsRoute from "./routes/allWallsRoute.js";
import authUserRoute from "./routes/authUserRoute.js"

app.use("/api", allWallsRoute);
app.use("/api/auth", authUserRoute);

app.listen(port, () => {
    console.log("server is listening on :", port);
})