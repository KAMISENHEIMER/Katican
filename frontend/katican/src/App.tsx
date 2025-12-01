import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage.tsx';
import Library from './pages/Library.tsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/library" element={<Library />} />
    </Routes>
  );
}

export default App;