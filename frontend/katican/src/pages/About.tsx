import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div>
      <Navbar />
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          margin: 0,
          color: "white",
          backgroundImage: "url(https://www.transparenttextures.com/patterns/stardust.png), linear-gradient(180deg, #170d3dff, #040812ff)",
        }}
      >
        <h1
          style={{
            fontFamily: '"Cinzel", serif',
            fontWeight: 500,
            margin: "10px",
            fontSize: "3rem",
          }}
        >
          About
        </h1>

        <div
          style={{
            fontFamily: '"Montserrat", sans-serif',
            color: "#cccccc",
            fontSize: "1.1rem",
            marginBottom: "10px",
          }}
        >
          Page under construction
        </div>

        <div
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            color: "#d4af37",
            fontSize: "1.4rem",
            letterSpacing: "1px",
          }}
        >
          I am but a man
        </div>
      </div>
    </div>
  );
};

export default About;