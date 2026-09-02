import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { checkAuth } from '../middleware/auth.js';

const userRouter = express.Router();


userRouter.post('/signup',registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', checkAuth, getUserProfile);

export default userRouter;
