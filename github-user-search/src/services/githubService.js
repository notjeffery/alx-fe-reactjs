import axios from 'axios';

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    // If you have a token:
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});

export const searchUser = async (username) => {
  const response = await githubAPI.get(`/users/${username}`);
  return response.data;
};
