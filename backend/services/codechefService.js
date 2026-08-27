import axios from 'axios';
import * as cheerio from 'cheerio';

export const fetchCodechefData = async (username) => {
    if (!username) {
        return { error: "Username is required" };
    }

    try {
        const url = `https://www.codechef.com/users/${username}`;

        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });

        const html = response.data;

        // Guard: Check if user exists (cheap string check, no DOM parse needed)
        if (html.includes("Page Not Found")) {
            return { error: "User not found or invalid CodeChef handle" };
        }

        const $ = cheerio.load(html);

        // ---------- Basic rating info ----------
        const ratingText = $('.rating-number').text().trim();
        if (!ratingText) {
            return { error: "User not found or invalid CodeChef handle" };
        }
        const rating = parseInt(ratingText, 10);

        const ratingStar = $('.rating-star').text().trim() || "Unrated";

        const highestMatch = html.match(/Highest Rating\s*(\d+)/i);
        const highestRating = highestMatch ? parseInt(highestMatch[1], 10) : rating;

        // ---------- Global / Country rank (regex — avoids scanning every <li>) ----------
        const globalRankMatch = html.match(/<strong>\s*(\d+)\s*<\/strong>\s*<\/a>\s*Global Rank/i);
        const countryRankMatch = html.match(/<strong>\s*(\d+)\s*<\/strong>\s*<\/a>\s*Country Rank/i);
        const globalRank = globalRankMatch ? parseInt(globalRankMatch[1], 10) : null;
        const countryRank = countryRankMatch ? parseInt(countryRankMatch[1], 10) : null;

        // ---------- Only the sidebar fields we actually need ----------
        let countryName = null;
        let studentStatus = null;
        let institution = null;

        $('.user-details-container ul.side-nav > li').each((_, el) => {
            const label = $(el).find('label').text().replace(/\s+/g, ' ').trim().replace(/:$/, '');
            if (label !== 'Country' && label !== 'Student/Professional' && label !== 'Institution') return;
            const value = $(el).clone().find('label').remove().end().text().replace(/\s+/g, ' ').trim();
            if (label === 'Country') countryName = value;
            else if (label === 'Student/Professional') studentStatus = value;
            else if (label === 'Institution') institution = value;
        });

        // ---------- Total problems solved (regex — skips the whole contest/problem DOM walk) ----------
        const solvedMatch = html.match(/Total Problems Solved:?\s*(\d+)/i);
        const totalProblemsSolved = solvedMatch ? parseInt(solvedMatch[1], 10) : 0;

        // ---------- Contest/rating history (hidden JS variable) ----------
        let contestHistory = [];
        const ratingVarMatch = html.match(/var\s+all_rating\s*=\s*(\[[\s\S]*?\]);/);
        if (ratingVarMatch) {
            try {
                contestHistory = JSON.parse(ratingVarMatch[1]).map(c => ({
                    contestCode: c.code,
                    contestName: c.name,
                    rating: parseInt(c.rating, 10),
                    rank: parseInt(c.rank, 10),
                    endDate: c.end_date
                }));
            } catch (e) {
                // Leave contestHistory empty rather than failing the whole request
            }
        }

        return {
            username,
            rating,
            highestRating,
            ratingStar,
            globalRank,
            countryRank,
            countryName,
            "Student/Professional": studentStatus,
            "Institution": institution,
            totalProblemsSolved,
            totalContests: contestHistory.length,
            contestHistory
        };

    } catch (error) {
        if (error.response && error.response.status === 404) {
            return { error: "User not found or invalid CodeChef handle" };
        }
        return { error: "Error fetching CodeChef data" };
    }
};