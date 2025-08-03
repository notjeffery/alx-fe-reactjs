import React, { useState } from 'react';
import { searchUsers } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setStatus('loading');
    setUsers([]);
    setErrorMsg('');

    try {
      const data = await searchUsers({ username: username.trim() });
      if (data.items && data.items.length > 0) {
        setUsers(data.items);
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg("Looks like we cant find the user");
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg("Looks like we cant find the user");
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-3 py-2 rounded w-full sm:w-auto flex-1"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {status === 'loading' && <p className="mt-4">Loading...</p>}
      {status === 'error' && (
        <p className="mt-4 text-red-600">{errorMsg}</p>
      )}

      {status === 'success' && users.length > 0 && (
        <div className="mt-6 grid gap-4">
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
              <div>
                <p className="font-semibold">{user.login}</p>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
