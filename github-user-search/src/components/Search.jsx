import React, { useState } from 'react';
import { fetchUserData } from '../services/githubService';
import UserCard from './UserCard';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    setStatus('loading');
    setUserData(null);
    setErrorMsg('');

    try {
      const data = await fetchUserData(username.trim());
      setUserData(data);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      if (err.response && err.response.status === 404) {
        setErrorMsg("Looks like we can't find the user");
      } else {
        setErrorMsg('An error occurred. Try again later.');
      }
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="GitHub username"
          style={{
            padding: '0.5rem',
            flex: '1',
            minWidth: '220px',
            borderRadius: '4px',
            border: '1px solid #ccc'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            border: 'none',
            cursor: 'pointer',
            background: '#0366d6',
            color: 'white'
          }}
        >
          Search
        </button>
      </form>

      {status === 'loading' && <p style={{ marginTop: '1rem' }}>Loading...</p>}
      {status === 'error' && (
        <p style={{ marginTop: '1rem', color: 'crimson' }}>{errorMsg}</p>
      )}
      {status === 'success' && userData && <UserCard user={userData} />}
    </div>
  );
};

export default Search;
