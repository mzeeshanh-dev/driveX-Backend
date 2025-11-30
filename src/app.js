import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

import carRoutes from "./routes/car.routes.js";
import bookingRoutes from "./routes/booking.route.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", carRoutes);
app.use("/api", bookingRoutes);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

export default app;