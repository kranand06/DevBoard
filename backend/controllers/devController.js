import { fetchCodechefData } from "../services/codechefService.js";
import { fetchCodeforcesData } from "../services/codeforcesService.js";
import { fetchGithubData } from "../services/githubService.js";
import { fetchLeetcodeData } from "../services/leetcodeService.js";

export const codeforcesStats = async (req, res) => {
    const username  = req.user.platforms?.codeforcesHandle;
    if (!username) return res.status(400).json({ message: "Codeforces handle not configured in your profile" });
    try {
        const data = await fetchCodeforcesData(username);
        if (data.error) return res.status(400).json(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};


export const leetcodeStats = async (req, res) => {
    const username  = req.user.platforms?.leetcodeHandle;
    if (!username) return res.status(400).json({ message: "LeetCode handle not configured in your profile" });
    try {
        const data = await fetchLeetcodeData(username);
        if (data.error) return res.status(400).json(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
};

export const codechefStats = async (req, res) => {
    const username  = req.user.platforms?.codechefHandle;
    if (!username) return res.status(400).json({ message: "CodeChef handle not configured in your profile" });
    try {
        const data = await fetchCodechefData(username);
        if (data.error) return res.status(400).json(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
};

export const githubStats = async (req, res) => {
    const username  = req.user.platforms?.githubHandle;
    if (!username) return res.status(400).json({ message: "GitHub handle not configured in your profile" });
    try {
        const data = await fetchGithubData(username);
        if (data.error) return res.status(400).json(data);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error", errorDetails: error.message });
    }
};

export const getAllDevStats = async (req, res) => {
    try {
        const platforms = req.user.platforms || {};

        // Fire requests concurrently using Promise.allSettled so one failing platform doesn't crash the whole dashboard
        const [cfResult, lcResult, ccResult, ghResult] = await Promise.allSettled([
            platforms.codeforcesHandle ? fetchCodeforcesData(platforms.codeforcesHandle) : Promise.resolve(null),
            platforms.leetcodeHandle ? fetchLeetcodeData(platforms.leetcodeHandle) : Promise.resolve(null),
            platforms.codechefHandle ? fetchCodechefData(platforms.codechefHandle) : Promise.resolve(null),
            platforms.githubHandle ? fetchGithubData(platforms.githubHandle) : Promise.resolve(null),
        ]);

        const statsResponse = {
            codeforces: cfResult.status === 'fulfilled' ? cfResult.value : { error: "Failed to fetch" },
            leetcode: lcResult.status === 'fulfilled' ? lcResult.value : { error: "Failed to fetch" },
            codechef: ccResult.status === 'fulfilled' ? ccResult.value : { error: "Failed to fetch" },
            github: ghResult.status === 'fulfilled' ? ghResult.value : { error: "Failed to fetch" }
        };

        return res.status(200).json(statsResponse);
    } catch (error) {
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};