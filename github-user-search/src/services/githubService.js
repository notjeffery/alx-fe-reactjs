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
  if (!username || typeof username !== 'string') {
    throw new Error('Username must be a non-empty string');
  }
  const response = await githubAPI.get(`/users/${username}`);
  return response.data;
};

/**
 * Search GitHub users by username.
 * @param {Object} params - { username }
 * @returns {Promise<Object>} - GitHub Search API response
 */
export const searchUsers = async ({ username }) => {
  const response = await githubAPI.get('/search/users', {
    params: {
      q: username,
    },
  });
  return response.data; // contains items array
};
