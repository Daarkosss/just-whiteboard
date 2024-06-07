import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WhiteboardHeader } from '../components/Header';
import ButtonPanel from '../components/ButtonPanel';
import PropertiesPanel from '../components/PropertiesPanel';
import WhiteboardCanvas from '../components/WhiteboardCanvas';
import store from '../store/RootStore';
import socketManager from "../api/SocketManager";

const Whiteboard: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log("Whiteboard ID:", id);
    if (id) {
      store.boards.fetchBoard(id);
      socketManager.connect();
    }

    return () => {
      socketManager.disconnect();
    };
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
