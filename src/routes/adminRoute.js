import express from 'express';
import { accessAdmin } from '../middleware/combinedMiddleware.js';
import { deleteUser, getUsers, changeUserRole } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', accessAdmin, getUsers);
router.delete('/users/:id', accessAdmin, deleteUser);
router.patch('/users/:id', accessAdmin, changeUserRole);



export default router;
