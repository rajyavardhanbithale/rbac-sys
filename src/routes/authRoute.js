import express from "express";
import { login, logout, refreshToken, register } from "../controllers/authController.js";
import { accessALL } from "../middleware/combinedMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken)
router.post("/logout", accessALL, logout)


export default router;
