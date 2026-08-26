import express from 'express';
import { registerUser, loginUser, getUserProfile, LogoutUser } from '../controllers/userController.js';
import { checkUserAuth } from '../Middleware/auth.js';

const userRouter = express.Router();


userRouter.post('/signup',registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/profile', checkUserAuth, getUserProfile);
userRouter.get('/logout', checkUserAuth, LogoutUser);

export default userRouter;
