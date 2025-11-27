import express from "express";
import cors from "cors";
import carRoutes from "./routes/car.routes.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// const allowedOrigins = [
//     "http://localhost:5000",
//     // Add other allowed domains here in production
// ];

app.use(cors());
app.use(express.json());
app.use("/api", carRoutes);

export default app;
