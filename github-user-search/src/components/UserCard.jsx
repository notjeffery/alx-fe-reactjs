import React from 'react';

const UserCard = ({ user }) => {
  if (!user) return null;

  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '1rem',
      maxWidth: '400px',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center',
      marginTop: '1rem'
    }}>
      <img
        src={user.avatar_url}
        alt={`${user.login} avatar`}
        style={{ width: 80, height: 80, borderRadius: '50%' }}
      />
      <div>
        <h2 style={{ margin: 0 }}>{user.name || user.login}</h2>
        {user.name && <p style={{ margin: 0, fontSize: '0.9rem', color: '#555' }}>@{user.login}</p>}
        <p style={{ margin: '0.25rem 0' }}>
          {user.bio || 'No bio available.'}
        </p>
        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none', color: '#0366d6' }}
        >
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default UserCard;
