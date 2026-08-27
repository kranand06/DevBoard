import { fetchCodeforcesData } from "../services/codeforcesService.js";

export const codeforcesStats = async (req, res) => {
    const username  = req.user.platforms?.codeforcesHandle;
    try {
        const data = await fetchCodeforcesData(username);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};