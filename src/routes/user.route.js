import express from "express";
import { ROLESENUM } from "../models/user.model";

const router = express.Router();

router.get("/profile", authenticate, authorize(ROLESENUM), getUserProfile);

export default router;
