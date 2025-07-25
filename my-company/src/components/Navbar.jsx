import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ backgroundColor: '#f4f4f4', padding: '10px' }}>
      <Link to="/" style={{ marginRight: '10px' }}>Home</Link>
      <Link to="/about" style={{ marginRight: '10px' }}>About</Link>
      <Link to="/services" style={{ marginRight: '10px' }}>Services</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}

export default Navbar;
