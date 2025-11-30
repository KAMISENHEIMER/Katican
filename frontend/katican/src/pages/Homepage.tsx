import React from 'react';
import Hero from '../components/Hero.tsx';
import Navbar from '../components/Navbar.tsx';
import Gateway from '../components/Gateway.tsx';

const Homepage = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <Gateway/>
    </div>
  );
};

export default Homepage;