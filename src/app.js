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


// cors
app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }
));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.json({
    message: "API is running",
    status: 200,
    repo: "https://github.com/rajyavardhanbithale/rbac-sys"
  });
})

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postsRoutes);

app.catchAll = (req, res) => {
  res.status(404).json({ message: "Route not found" });
}

export default app;
