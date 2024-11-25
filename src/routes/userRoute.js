import express from "express";
import { ROLES } from "../models/userModel.js";
import authenticate from "../middleware/authMiddleware.js";
import authorize from "../middleware/authorizeMiddleware.js";
import { getUserProfile } from "../controllers/authContorller.js";

const router = express.Router();

const availableRoles = [ROLES.ADMIN, ROLES.USER, ROLES.MODERATOR]; 

router.get("/profile", authenticate, authorize(availableRoles), getUserProfile);

export default router;
