import express from 'express';
import authenticate from '../middleware/auth.middleware.js';
import { ROLESENUM } from '../models/user.model.js';
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
  authorize([ROLESENUM.ADMIN]),
  createUser
);

router.get(
  '/users',
  authenticate,
  authorize([ROLESENUM.ADMIN]),
  getUsers
);

router.get(
  '/users/:id',
  authenticate,
  authorize([ROLESENUM.ADMIN]),
  getUserById
);

router.put(
  '/users/:id',
  authenticate,
  authorize([ROLESENUM.ADMIN]),
  updateUser
);

router.delete(
  '/users/:id',
  authenticate,
  authorize([ROLESENUM.ADMIN]),
  deleteUser
);

router.put(
  '/users/:id/role',
  authenticate,
  authorize([ROLESENUM.ADMIN]),
  changeUserRole
);

export default router;
