import express from 'express';
import { handleChatPrompt, getChatHistory } from '../controllers/chatController';
import { protect, attachUserIfPresent } from '../middleware/authMiddleware';

const router = express.Router();

// This single route now handles both guest and logged-in users
router.post('/', attachUserIfPresent, handleChatPrompt);

// This route is protected and only for logged-in users
router.get('/history', protect, getChatHistory);

export default router;