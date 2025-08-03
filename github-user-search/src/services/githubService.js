import axios from 'axios';

const githubAPI = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: import.meta.env.VITE_APP_GITHUB_API_KEY
      ? `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`
      : undefined,
  },
});

/**
 * Fetch basic GitHub user data by username.
 * @param {string} username
 * @returns {Promise<Object>}
 */
export const fetchUserData = async (username) => {
  const response = await githubAPI.get(`/users/${username}`);
  return response.data;
};
