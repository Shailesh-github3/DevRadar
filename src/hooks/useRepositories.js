import { useQuery } from '@tanstack/react-query';
import { fetchRepositories } from '../api/githubApi';

/**
 * useRepositories Hook
 * 
 * Purpose: Service layer for fetching and caching a user's repositories.
 * Analogy: A DAO/Repository pattern that abstracts the HTTP and caching 
 * mechanics away from the Controller (Search.jsx).
 * 
 * @param {string} username - The GitHub username to fetch repos for.
 * @returns {object} - Contains data, isLoading, isError, and error.
 */
function useRepositories(username) {
  return useQuery({
    // queryKey MUST include the username. If we just used ['repos'], 
    // React Query would return User A's cached repos when searching for User B.
    queryKey: ['repos', username],
    queryFn: () => fetchRepositories(username),
    // Prevents the query from firing until a valid username is provided.
    enabled: !!username,
  });
}

export default useRepositories;