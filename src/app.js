import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/authRoute.js";
import userRoutes from "./routes/userRoute.js";
import postsRoutes from "./routes/postsRoute.js";
import adminRoutes from "./routes/adminRoute.js";
import dashboardRoutes from "./routes/dashboardRoute.js";

dotenv.config();

const app = express();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// cors
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
    }
));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postsRoutes);

export default app;
