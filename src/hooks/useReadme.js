import { useQuery } from '@tanstack/react-query';
import { fetchReadme } from '../api/githubApi';

/**
 * useReadme Hook
 * 
 * Purpose: Service layer for fetching and caching README content.
 * Separate from useRepositoryDetails because a repo may exist without a README.
 * 
 * @param {string} owner - The repository owner.
 * @param {string} repoName - The repository name.
 * @returns {object} - Contains data (markdown string), isLoading, isError, and error.
 */
function useReadme(owner, repoName) {
  return useQuery({
    queryKey: ['readme', owner, repoName],
    queryFn: () => fetchReadme(owner, repoName),
    enabled: !!owner && !!repoName,
  });
}

export default useReadme;