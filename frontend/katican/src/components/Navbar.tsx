import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <a className="nav-logo" onClick={() => navigate('/')} >KATICAN</a>
      </div>
      <ul className="nav-links">
        <li><a className="nav-item" onClick={() => navigate('/')}>Home</a></li>
        <li><a className="nav-item" onClick={() => navigate('/library')}>Library</a></li>
        <li><a className="nav-item" onClick={() => navigate('/shelf')}>Your Shelf</a></li>
        <li><a className="nav-item" onClick={() => navigate('/about')}>About</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;