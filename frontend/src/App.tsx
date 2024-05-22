import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Whiteboard from './pages/Whiteboard';
import './scss/main.scss';

const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/whiteboard/:id" element={<Whiteboard />} />
      </Routes>
    </div>
  );
};

export default App;
