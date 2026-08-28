import express from "express";
import { checkAuth } from "../middleware/auth.js";
import {codeforcesStats, leetcodeStats, codechefStats, githubStats, getAllDevStats} from "../controllers/devController.js";

const devRouter = express.Router();

devRouter.use(checkAuth); // Apply checkAuth middleware to all routes in this router

devRouter.get("/codeforces", codeforcesStats);
devRouter.get("/leetcode", leetcodeStats);
devRouter.get("/codechef", codechefStats);
devRouter.get("/github", githubStats);
devRouter.get("/stats", getAllDevStats);

export default devRouter;
