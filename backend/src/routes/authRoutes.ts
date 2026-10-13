import express from 'express';
import { registerUser, authUser, resetPassword } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/reset-password', resetPassword);

export default router;
