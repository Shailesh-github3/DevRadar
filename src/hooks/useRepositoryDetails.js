import { useQuery } from '@tanstack/react-query';
import { fetchRepositoryDetails } from '../api/githubApi';

/**
 * useRepositoryDetails Hook
 * 
 * Purpose: Service layer for fetching and caching detailed repository metadata.
 * 
 * @param {string} owner - The repository owner.
 * @param {string} repoName - The repository name.
 * @returns {object} - Contains data, isLoading, isError, and error.
 */
function useRepositoryDetails(owner, repoName) {
  return useQuery({
    queryKey: ['repoDetails', owner, repoName],
    queryFn: () => fetchRepositoryDetails(owner, repoName),
    enabled: !!owner && !!repoName,
  });
}

export default useRepositoryDetails;