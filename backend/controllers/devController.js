import { fetchCodechefData } from "../services/codechefService.js";
import { fetchCodeforcesData } from "../services/codeforcesService.js";
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