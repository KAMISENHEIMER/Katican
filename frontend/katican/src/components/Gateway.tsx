import { useNavigate } from 'react-router-dom';
import { Sword, Rocket, Zap } from 'lucide-react';
import PortalCard from './PortalCard.tsx';
import '../styles/Gateway.css';

const Gateway = () => {
  const navigate = useNavigate();

  const handleGenreClick = (category: string) => {
  navigate(`/library?category=${category}`);
  };

  const handleViewAll = () => {
    navigate('/library');
  };

  return (
    <section className="gateway-section">
      <h3 className="gateway-header">View Stories</h3>
      
      <div className="card-container">
        {/* Fantasy */}
        <div onClick={() => handleGenreClick('fantasy')} style={{ flex: '1 1 300px' }}>
          <PortalCard 
            title="Fantasy" 
            icon={Sword} 
            desc="Dragons, dungeons, and ancient magic."
            color="147, 51, 234" 
          />
        </div>
        
        {/* Space */}
        <div onClick={() => handleGenreClick('space')}  style={{ flex: '1 1 300px' }}>
          <PortalCard 
            title="Space" 
            icon={Rocket} 
            desc="Starships, aliens, and the cold void."
            color="56, 189, 248" 
          />
        </div>
        
        {/* Heroes */}
        <div onClick={() => handleGenreClick('heroes')} style={{ flex: '1 1 300px' }}>
          <PortalCard 
            title="Heroes" 
            icon={Zap} 
            desc="Masks, powers, and the struggle for justice."
            color="234, 179, 8" 
          />
        </div>
      </div>

      <button className="view-all-btn" onClick={handleViewAll}>
        View All Stories
      </button>
    </section>
  );
};

export default Gateway;