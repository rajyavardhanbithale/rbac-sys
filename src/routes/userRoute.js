import express from "express";
import { getUserProfile } from "../controllers/authController.js";
import { accessALL } from "../middleware/combinedMiddleware.js";

const router = express.Router();



router.get("/profile", accessALL, getUserProfile);

export default router;
