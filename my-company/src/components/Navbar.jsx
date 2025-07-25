import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: '#f0f0f0',
      }}
    >
      <h2>My Company</h2>
      <div>
        <Link to="/" style={{ margin: '0 10px' }}>Home</Link>
        <Link to="/about" style={{ margin: '0 10px' }}>About</Link>
        <Link to="/services" style={{ margin: '0 10px' }}>Services</Link>
        <Link to="/contact" style={{ margin: '0 10px' }}>Contact</Link>
      </div>
    </nav>
  );
}

export default Navbar;
