import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WhiteboardHeader } from '../components/Header';
import ButtonPanel from '../components/ButtonPanel';
import PropertiesPanel from '../components/PropertiesPanel';
import WhiteboardCanvas from '../components/WhiteboardCanvas';
import store from '../store/RootStore';

const Whiteboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log("Whiteboard ID:", id);
    if (id)
      store.boards.fetchBoardObjects(id);
  }, [id])

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
