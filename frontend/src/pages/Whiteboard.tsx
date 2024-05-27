import React from 'react';
import { WhiteboardHeader } from '../components/Header';
import ButtonPanel from '../components/ButtonPanel';
import PropertiesPanel from '../components/PropertiesPanel';
import WhiteboardCanvas from '../components/WhiteboardCanvas';

const Whiteboard: React.FC = () => {
  return (
    <div>
      <WhiteboardCanvas />
      <div className="canvas-container">
        <WhiteboardHeader />
        <ButtonPanel />
        <PropertiesPanel />
      </div>
    </div>
  );
};

export default Whiteboard;
