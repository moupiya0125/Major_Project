import { Response } from 'express';
import Chat from '../models/Chat';
import { AuthRequest } from '../middleware/authMiddleware';
import { getChatbotResponse } from '../services/chatbotService';

export const handleChatPrompt = async (req: AuthRequest, res: Response) => {
    const { prompt } = req.body;
    const user = req.user;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required' });
    }

    try {
        const botResponse = await getChatbotResponse(prompt);

        // If user is logged in (user object is attached), save the interaction
        if (user) {
            let chat = await Chat.findOne({ userId: user._id });
            if (!chat) {
                chat = new Chat({ userId: user._id, messages: [] });
            }
            chat.messages.push({ role: 'user', content: prompt, timestamp: new Date() });
            chat.messages.push({ role: 'bot', content: botResponse, timestamp: new Date() });
            await chat.save();
        }

        res.json({ response: botResponse });

    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ message: 'Error processing chat prompt' });
    }
};

export const getChatHistory = async (req: AuthRequest, res: Response) => {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const chat = await Chat.findOne({ userId: user._id });
        if (chat) {
            res.json(chat.messages);
        } else {
            res.json([]); // No history yet
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching chat history' });
    }
};