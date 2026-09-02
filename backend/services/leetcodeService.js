export const fetchLeetcodeData = async (username) => {
if (!username) {
        return { error: "Username is required" };
    }

const query = `
        query userFullProfile($username: String!) {
            allQuestionsCount {
                difficulty
                count
            }
            matchedUser(username: $username) {
                username
                githubUrl
                twitterUrl
                linkedinUrl
                profile {
                    realName
                    aboutMe
                    userAvatar
                    ranking
                    reputation
                    countryName
                    company
                    school
                    skillTags
                }
                submitStats: submitStatsGlobal {
                    acSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                    totalSubmissionNum {
                        difficulty
                        count
                        submissions
                    }
                }
                problemsSolvedBeatsStats {
                    difficulty
                    percentage
                }
                badges {
                    name
                    icon
                }
                activeBadge {
                    name
                    icon
                }
                languageProblemCount {
                    languageName
                    problemsSolved
                }
                tagProblemCounts {
                    advanced {
                        tagName
                        tagSlug
                        problemsSolved
                    }
                    intermediate {
                        tagName
                        tagSlug
                        problemsSolved
                    }
                    fundamental {
                        tagName
                        tagSlug
                        problemsSolved
                    }
                }
                userCalendar {
                    activeYears
                    streak
                    totalActiveDays
                    submissionCalendar
                }
            }
            userContestRanking(username: $username) {
                rating
                globalRanking
                topPercentage
                attendedContestsCount
            }
            recentAcSubmissionList(username: $username, limit: 10) {
                title
                titleSlug
                timestamp
            }
        }
    `;

    try {
        const response = await fetch("https://leetcode.com/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Referer": "https://leetcode.com"
            },
            body: JSON.stringify({
                query: query,
                variables: { username }
            })
        });

        const result = await response.json();

        if (result.errors || !result.data?.matchedUser) {
            return { error: "User not found or invalid LeetCode handle" , response: result};
        }

        return result.data.matchedUser;
    } catch (error) {
        return { error: "Error fetching LeetCode data" };
    }
};
