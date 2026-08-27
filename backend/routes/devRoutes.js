import express from 'express';
import { checkAuth } from '../middleware/auth.js';
import { codeforcesStats, leetcodeStats,codechefStats } from '../controllers/devController.js';

const devRouter = express.Router();

devRouter.get('/codeforces', checkAuth, codeforcesStats);
devRouter.get('/leetcode', checkAuth, leetcodeStats);
devRouter.get('/codechef', checkAuth, codechefStats);

export default devRouter;