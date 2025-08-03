import React, { useState } from 'react';
import { searchUsers, fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 5;

  const doSearch = async (pageToFetch = 1, append = false) => {
    if (!username.trim() && !location.trim() && !minRepos) {
      setErrorMsg('Provide at least one search criterion');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMsg('');

    try {
      const result = await searchUsers({
        username: username.trim(),
        location: location.trim(),
        minRepos: minRepos ? Number(minRepos) : 0,
        page: pageToFetch,
        per_page: perPage,
      });

      const items = result.items || [];
      if (items.length === 0) {
        setUsers([]);
        setStatus('error');
        setErrorMsg("Looks like we cant find the user");
        return;
      }

      // Fetch full profiles to get location and repo count
      const detailedUsers = await Promise.all(
        items.map((u) => fetchUserData(u.login))
      );

      setUsers((prev) => (append ? [...prev, ...detailedUsers] : detailedUsers));
      setStatus('success');
      setPage(pageToFetch);
    } catch (err) {
      setStatus('error');
      setErrorMsg("Looks like we cant find the user");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doSearch(1, false);
  };

  const loadMore = () => {
    doSearch(page + 1, true);
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-4">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="e.g., torvalds"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., Lagos"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Min Repos</label>
          <input
            type="number"
            min="0"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
            placeholder="e.g., 10"
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      {status === 'loading' && <p className="mt-4">Loading...</p>}
      {status === 'error' && (
        <p className="mt-4 text-red-600">{errorMsg}</p>
      )}

      {status === 'success' && users.length > 0 && (
        <div className="mt-6 space-y-4">
          {users.map((user) => (
            <div
              key={user.login}
              className="border p-4 rounded flex items-center gap-4"
            >
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="w-16 h-16 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{user.name || user.login}</p>
                    <p className="text-sm text-gray-600">@{user.login}</p>
                  </div>
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm"
                  >
                    View Profile
                  </a>
                </div>
                <p className="text-sm mt-1">
                  Location: {user.location || 'Not specified'}
                </p>
                <p className="text-sm">Public Repos: {user.public_repos}</p>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Load more
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
