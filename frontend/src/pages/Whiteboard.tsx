import React from 'react';
import Header from '../components/Header';
import ButtonPanel from '../components/ButtonPanel';
import PropertiesPanel from '../components/PropertiesPanel';
import WhiteboardCanvas from '../components/WhiteboardCanvas';
import '../scss/main.scss';

const Whiteboard: React.FC = () => {
  return (
    <div>
      <WhiteboardCanvas />
      <div className="canvas-container">
        <Header />
        <ButtonPanel />
        <PropertiesPanel />
      </div>
    </div>
  );
};

export default Whiteboard;
