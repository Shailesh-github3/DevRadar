import { useQuery } from '@tanstack/react-query';
import { fetchGithubUser } from '../api/githubApi';

export const useGithubUser = (username) => {
  return useQuery({
    queryKey: ['githubUser', username], // Unique cache key
    queryFn: () => fetchGithubUser(username), // The function to run
    enabled: !!username, // CRITICAL: Only run if username is not empty
  });
};