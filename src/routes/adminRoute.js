import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import { ROLES } from '../models/user.model.js';
import authorize from '../middleware/authorize.middleware.js';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  changeUserRole
} from '../controllers/admin.controller.js';

const router = express.Router();


router.post(
  '/users',
  authenticate,
  authorize([ROLES.ADMIN]),
  createUser
);

router.get(
  '/users',
  authenticate,
  authorize([ROLES.ADMIN]),
  getUsers
);

router.get(
  '/users/:id',
  authenticate,
  authorize([ROLES.ADMIN]),
  getUserById
);

router.put(
  '/users/:id',
  authenticate,
  authorize([ROLES.ADMIN]),
  updateUser
);

router.delete(
  '/users/:id',
  authenticate,
  authorize([ROLES.ADMIN]),
  deleteUser
);

router.put(
  '/users/:id/role',
  authenticate,
  authorize([ROLES.ADMIN]),
  changeUserRole
);

export default router;
