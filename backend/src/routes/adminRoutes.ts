import express from 'express';
import { getUsers, verifyUser, deleteUser, toggleUserPremium } from '../controllers/adminController';
import { protect, admin } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/users').get(protect, admin, getUsers);
router.route('/users/:id').delete(protect, admin, deleteUser);
router.route('/users/:id/verify').put(protect, admin, verifyUser);
router.route('/users/:id/premium').put(protect, admin, toggleUserPremium);

export default router;
