import express from 'express';
import { getUserProfile, updateUserProfile, getMatches, getAllUsers } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/matches').get(protect, getMatches);

export default router;
