import React from 'react';
import '../styles/Hero.css';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-dust"></div>
      
      <span className="welcome-line">WELCOME TO THE</span>
      <h1 className="main-title">KATICAN</h1>
      <h2 className="sub-title">A collaborative creative writing project.</h2>

      <div className="scroll-indicator">
        <span className="scroll-text">ENTER ARCHIVE</span>
        <ChevronDown color="#fff" size={24} />
      </div>

    </section>
  );
};

export default Hero;