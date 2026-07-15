import { useQuery } from '@tanstack/react-query';
import { fetchGithubUser } from '../api/githubApi';

function useGithubUser(username) {
  return useQuery({
    queryKey: ['githubUser', username],
    queryFn: () => fetchGithubUser(username),
    enabled: !!username,
  });
}

export default useGithubUser;