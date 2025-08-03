import React from 'react';
import Search from './components/Search';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif', maxWidth: 800, margin: '0 auto' }}>
      <h1>GitHub User Search</h1>
      <p>Type a GitHub username and hit search to see basic profile info.</p>
      <Search />
    </div>
  );
}

export default App;
