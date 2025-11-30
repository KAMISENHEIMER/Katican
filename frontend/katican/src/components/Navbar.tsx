import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <a href="#" className="nav-logo">KATICAN</a>
      </div>
      <ul className="nav-links">
        <li><a href="#" className="nav-item">Home</a></li>
        <li><a href="#" className="nav-item">Library</a></li> {/*links go here*/}
        <li><a href="#" className="nav-item">About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;