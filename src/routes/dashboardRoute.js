import express from 'express';
import { accessAdmin } from '../middleware/combinedMiddleware.js';
import { dashboardStats } from '../controllers/dashboardController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', authenticate, dashboardStats);

export default router;