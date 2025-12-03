import { useState } from 'react';
import '../styles/PortalCard.css';

const PortalCard = ({ title, icon: Icon, desc, color }) => {
  const [hover, setHover] = useState(false);

  //different styles for each card on hover
  const dynamicCardStyle = {
    transform: hover ? 'scale(1.02)' : 'scale(1)',
    backgroundColor: hover ? `rgba(${color}, 0.05)` : 'rgba(255,255,255,0.02)',
    borderColor: hover ? `rgba(${color}, 0.5)` : 'rgba(255,255,255,0.1)',
    boxShadow: hover ? `0 0 30px rgba(${color}, 0.15)` : 'none'
  };

  const dynamicInnerStyle = {
    borderColor: hover ? `rgba(${color}, 0.8)` : 'rgba(212, 175, 55, 0.2)',
  };

  const dynamicIconStyle = {
    color: hover ? `rgb(${color})` : '#D4AF37',
    transform: hover ? 'scale(1.1) translateY(-10px)' : 'scale(1)',
    marginBottom: '2rem',
    transition: 'transform 0.5s ease, color 0.3s ease',
  };

  const dynamicTitleStyle = {
    letterSpacing: hover ? '0.2em' : '0.1em',
    textShadow: hover ? `0 0 10px rgba(${color}, 0.5)` : 'none'
  };

  const dynamicDescStyle = {
    opacity: hover ? 1 : 0,
    transform: hover ? 'translateY(0)' : 'translateY(20px)',
  };

  return (
    <div 
      className="portal-card"
      style={dynamicCardStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="portal-inner" style={dynamicInnerStyle}>
        <Icon 
          size={48} 
          style={dynamicIconStyle} 
          strokeWidth={1}
        />
        <h3 className="portal-title" style={dynamicTitleStyle}>
          {title}
        </h3>
        <p className="portal-desc" style={dynamicDescStyle}>
          {desc}
        </p>
      </div>
    </div>
  );
};

export default PortalCard;