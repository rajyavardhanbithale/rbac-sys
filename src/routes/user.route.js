import express from "express";
import { ROLESENUM } from "../models/user.model.js";
import authenticate from "../middleware/authenticate.js";
import authorize from "../middleware/authorize.js";
import { getUserProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/profile", authenticate, authorize(ROLESENUM), getUserProfile);

export default router;
