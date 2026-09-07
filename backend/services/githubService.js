export const fetchGithubData = async (username) => {
  if (!username) {
    return { error: 'Username is required' };
  }

  try {
    const githubHeaders = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'Developer-Dashboard-App',
      'X-GitHub-Api-Version': '2022-11-28',
    };

    const userUrl = `https://api.github.com/users/${username}`;
    const reposUrl =
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=12`;
    const contributionsUrl =
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`;

    const [userRes, reposRes, contriRes] = await Promise.all([
      fetch(userUrl, { headers: githubHeaders }),
      fetch(reposUrl, { headers: githubHeaders }),
      fetch(contributionsUrl),
    ]);

    const userData = await userRes.json();

    if (userRes.status === 404 || userData.message === 'Not Found') {
      return { error: 'User not found or invalid GitHub handle' };
    }

    if (!userRes.ok) {
      return {
        error: 'Error fetching GitHub user data',
        details: userData.message || 'Unknown error',
      };
    }

    if (!reposRes.ok) {
      const reposError = await reposRes.json();

      return {
        error: 'Error fetching GitHub repositories',
        details: reposError.message || 'Unknown error',
      };
    }

    const reposData = await reposRes.json();

    let contriData = null;

    if (contriRes.ok) {
      contriData = await contriRes.json();
    }

    let totalStars = 0;
    let totalForks = 0;
    const languageMap = {};

    const repositories = Array.isArray(reposData)
      ? reposData.map((repo) => {
          totalStars += repo.stargazers_count || 0;
          totalForks += repo.forks_count || 0;

          if (repo.language) {
            languageMap[repo.language] =
              (languageMap[repo.language] || 0) + 1;
          }

          return {
            id: repo.id,
            name: repo.name,
            fullName: repo.full_name,
            description: repo.description || 'No description provided',

            htmlUrl: repo.html_url,
            homepage: repo.homepage || null,

            language: repo.language || null,
            topics: repo.topics || [],

            stars: repo.stargazers_count || 0,
            forks: repo.forks_count || 0,
            openIssues: repo.open_issues_count || 0,
            watchers: repo.watchers_count || 0,

            sizeKb: repo.size || 0,
            defaultBranch: repo.default_branch,

            isFork: repo.fork,
            isArchived: repo.archived,
            isPrivate: repo.private,
            visibility: repo.visibility,

            license: repo.license?.spdx_id || null,

            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
          };
        })
      : [];

    const languages = Object.entries(languageMap).map(
      ([language, repo]) => ({
        language,
        repo,
      })
    );

    return {
      username: userData.login,
      name: userData.name,
      avatarUrl: userData.avatar_url,
      profileUrl: userData.html_url,
      bio: userData.bio,

      totalRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      createdAt: userData.created_at,

      totalStars,
      totalForks,

      languages,
      topRepositories: repositories,
      contriCalendar: contriData,
    };
  } catch (error) {
    return {
      error: 'Error fetching GitHub data',
      details: error.message,
    };
  }
};