import express from 'express';
import { accessAdmin, accessALL } from '../middleware/combinedMiddleware.js';
import { dashboardStats } from '../controllers/dashboardController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', accessALL, dashboardStats);

export default router;