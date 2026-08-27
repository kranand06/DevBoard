export const fetchGithubData = async (username) => {
    if (!username) {
        return { error: "Username is required" };
    }

    try {
        const userUrl = `https://api.github.com/users/${username}`;
        const reposUrl = `https://api.github.com/users/${username}/repos?sort=updated&per_page=4`;

        const [userRes, reposRes] = await Promise.all([
            fetch(userUrl, { headers: { "User-Agent": "Developer-Dashboard-App" } }),
            fetch(reposUrl, { headers: { "User-Agent": "Developer-Dashboard-App" } })
        ]);

        const userData = await userRes.json();
        const reposData = await reposRes.json();

        if (userRes.status === 404 || userData.message === "Not Found") {
            return { error: "User not found or invalid GitHub handle" };
        }

        if (!userRes.ok) {
            return { error: "Error fetching GitHub data" };
        }

        let totalStars = 0;
        let totalForks = 0;
        const languageMap = {};

        const repositories = Array.isArray(reposData) ? reposData.map(repo => {
            totalStars += repo.stargazers_count || 0;
            totalForks += repo.forks_count || 0;

            if (repo.language) {
                languageMap[repo.language] = (languageMap[repo.language] || 0) + 1;
            }

            return {
                name: repo.name,
                description: repo.description,
                htmlUrl: repo.html_url
            };
        }) : [];

        return {
            username: userData.login,
            name: userData.name,
            avatarUrl: userData.avatar_url,
            profileUrl: userData.html_url,
            bio: userData.bio,
            publicRepos: userData.public_repos,
            followers: userData.followers,
            following: userData.following,
            createdAt: userData.created_at,
            totalStars,
            totalForks,
            languageBreakdown: languageMap,
            topRepositories: repositories
        };

    } catch (error) {
        return { error: "Error fetching GitHub data" };
    }
};
