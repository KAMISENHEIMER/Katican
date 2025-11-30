import React from 'react';
import { Sword, Rocket, Zap } from 'lucide-react';
import PortalCard from './PortalCard.tsx';
import '../styles/Gateway.css';

const Gateway = () => {
  return (
    <section className="gateway-section">
      <h3 className="gateway-header">View Stories</h3>
      
      <div className="card-container">
        <PortalCard 
          title="Fantasy" 
          icon={Sword} 
          desc="Dragons, dungeons, and ancient magic."
          color="147, 51, 234" 
        />
        
        <PortalCard 
          title="Space" 
          icon={Rocket} 
          desc="Starships, aliens, and the cold void."
          color="56, 189, 248" 
        />
        
        <PortalCard 
          title="Heroes" 
          icon={Zap} 
          desc="Masks, powers, and the struggle for justice."
          color="234, 179, 8" 
        />
      </div>

      <button className="view-all-btn">
        View All Stories
      </button>
    </section>
  );
};

export default Gateway;