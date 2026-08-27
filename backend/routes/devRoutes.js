import express from 'express';
import { checkAuth } from '../middleware/auth.js';
import { codeforcesStats } from '../controllers/devController.js';

const devRouter = express.Router();

devRouter.get('/codeforces', checkAuth, codeforcesStats);

export default devRouter;