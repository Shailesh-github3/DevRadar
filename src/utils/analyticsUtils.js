export const getLanguageDistribution = (repos) => {
  if (!repos || repos.length === 0) return [];

  const counts = {};
  repos.forEach((repo) => {
    if (repo.language && repo.language !== 'null') {
      counts[repo.language] = (counts[repo.language] || 0) + 1;
    }
  });

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value })) // Outputs {name: 'Go', value: 21}
    .sort((a, b) => b.value - a.value);
};

export const getTopReposByStars = (repos, limit = 10) => {
    return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit)
    .map((repo) => ({
        name : repo.name,
        stars : repo.stargazers_count,
    }));
};

export const getCreationTimeline = (repos) => {
    if(!repos || repos.length === 0) return [];

    const counts = {};
    repos.forEach(repo => {
        const month = repo.created_at.slice(0, 7); // Extract "YYYY-MM" from ISO date string (e.g., "2023-07-15T...")
        counts[month] = (counts[month] || 0) + 1;
    });

    return Object.entries(counts)
    .map(([month, count]) => ({ month, count }))
    .sort((a, b) => a.month.localeCompare(b.month)); // Sort by date ascending

}