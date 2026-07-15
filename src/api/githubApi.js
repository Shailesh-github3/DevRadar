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

export const fetchRepositories = async (username) => {
  const response = await githubApi.get(`/users/${username}/repos`,{
    params: {
      per_page : 100,
      sort : 'updated',
      direction : 'desc',
    },
  });
  return response.data;
};

export const fetchRepositoryDetails = async (username, repoName) => {
  const response = await githubApi.get(`/repos/${username}/${repoName}`);
  return response.data;
}

export const fetchReadme = async (username, repoName) => {
  const response = await githubApi.get(`/repos/${username}/${repoName}/readme`, {
    headers: {
      Accept: 'application/vnd.github.v3.raw', // Get raw content
    },
  });
  return response.data;
}