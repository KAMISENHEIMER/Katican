import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.tsx';
import Library from './pages/Library.tsx';
import Shelf from './pages/Shelf.tsx';
import About from './pages/About.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/library" element={<Library />} />
      <Route path="/shelf" element={<Shelf />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;