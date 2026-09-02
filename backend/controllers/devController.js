import { fetchCodechefData } from "../services/codechefService.js";
import { fetchCodeforcesData } from "../services/codeforcesService.js";
import { fetchGithubData } from "../services/githubService.js";
import { fetchLeetcodeData } from "../services/leetcodeService.js";
import Platform from "../models/platformSchema.js";

export const codeforcesStats = async (req, res) => {
    const platform = await Platform.findOne({ userId: req.user.id });
    const username  = platform.handle?.codeforcesHandle;
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
    const platform = await Platform.findOne({ userId: req.user.id });
    const username  = platform.handle?.leetcodeHandle;
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
    const platform = await Platform.findOne({ userId: req.user.id });
    const username  = platform.handle?.codechefHandle;
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
    const platform = await Platform.findOne({ userId: req.user.id });
    const username  = platform.handle?.githubHandle;
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
    try{
        const data = await Platform.findOne({ userId: req.user.id });
        console.log("User ID:", req.user.id);
        console.log("Platform data fetched:", data);
        if(!data) return res.status(404).json({ message: "Platform data not found" });
        res.status(200).json(data);
    }catch (error) {
        res.status(500).json({ message: "Error fetching platform data", error: error.message });
    }
}


export const updatePlatform = async (req, res) => {
  try {
    const platform = await Platform.findOne({ userId: req.user._id });
    console.log("Platform found:", platform);
    console.log("Request body:", req.user);
    if (!platform) {
      return res.status(404).json({ message: "Platform not found" });
    }
    const {
      leetcodeHandle,
      codeforcesHandle,
      codechefHandle,
      githubHandle,
    //   hackerrankHandle,
    } = req.body;

    if (leetcodeHandle !== undefined){
        platform.handle.leetcodeHandle = leetcodeHandle;
        const data = await fetchLeetcodeData(leetcodeHandle);
        platform.leetcodeData = data;
    }
    if (codeforcesHandle !== undefined){
        platform.handle.codeforcesHandle = codeforcesHandle;
        const data = await fetchCodeforcesData(codeforcesHandle);
        platform.codeforcesData = data;
    }
    if (codechefHandle !== undefined){
        platform.handle.codechefHandle = codechefHandle;
        const data = await fetchCodechefData(codechefHandle);
        platform.codechefData = data;
    }
    if (githubHandle !== undefined){
        platform.handle.githubHandle = githubHandle;
        const data = await fetchGithubData(githubHandle);
        platform.githubData = data;
    }
    // if (hackerrankHandle !== undefined){
    //     platform.handle.hackerrankHandle = hackerrankHandle;
    //     const data = await fetchHackerrankData(hackerrankHandle);
    //     platform.hackerrankData = data;
    // }
    await platform.save();
    res.status(200).json({ platform});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};