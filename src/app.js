import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";


import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import postsRoutes from "./routes/postsRoute.js";
import adminRoutes from "./routes/adminRoute.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postsRoutes);

export default app;
