import express from 'express';
import { checkAuth } from '../middleware/auth.js';

const widgetRouter = express.Router();

// widgetRouter.get('/', checkAuth, codeforcesStats);
// widgetRouter.put('/', checkAuth, codeforcesStats);


export default widgetRouter;