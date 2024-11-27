import express from "express";
import { login, refreshToken, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/refresh-token",refreshToken)

export default router;
