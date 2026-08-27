import express from 'express';
import { registerUser, loginUser, getUserProfile, updatePlatform } from '../controllers/UserController.js';
import { checkAuth } from '../middleware/auth.js';

const userRouter = express.Router();


userRouter.post('/signup',registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', checkAuth, getUserProfile);
userRouter.put('/platforms', checkAuth, updatePlatform);

export default userRouter;
