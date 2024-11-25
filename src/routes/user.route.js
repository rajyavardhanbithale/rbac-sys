import express from "express";
import { ROLES } from "../models/user.model.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import { getUserProfile } from "../controllers/auth.controller.js";

const router = express.Router();

const availableRoles = [ROLES.ADMIN, ROLES.USER, ROLES.MODERATOR]; 

router.get("/profile", authenticate, authorize(availableRoles), getUserProfile);

export default router;
