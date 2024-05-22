// src/pages/Home.tsx
import React from 'react';
import WhiteboardThumbnail from '../components/WhiteboardThumbnail';

const whiteboards = [
  { id: '1', title: 'Whiteboard 1' },
  { id: '2', title: 'Whiteboard 2' },
  { id: '3', title: 'Whiteboard 3' },
  { id: '4', title: 'Whiteboard 4' },
];

const Home: React.FC = () => {
  return (
    <div className="home-container">
      <h1>Available Whiteboards</h1>
      <div className="whiteboard-grid">
        {whiteboards.map((whiteboard) => (
          <div>
            {whiteboard.title}
            <WhiteboardThumbnail key={whiteboard.id} id={whiteboard.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
