import express from "express";
import { login, refreshToken, register } from "../controllers/authController.js";
import { accessALL } from "../middleware/combinedMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", refreshToken)


export default router;
