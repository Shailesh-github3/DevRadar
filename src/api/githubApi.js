import axios from 'axios';

// Read the token from the environment variables
const token = import.meta.env.VITE_GITHUB_TOKEN;

const githubApi = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    // Attach the token to every request automatically
    Authorization: token ? `Bearer ${token}` : '',
    Accept: 'application/vnd.github.v3+json',
  },
});

export const fetchGithubUser = async (username) => {
  const response = await githubApi.get(`/users/${username}`);
  return response.data;
};