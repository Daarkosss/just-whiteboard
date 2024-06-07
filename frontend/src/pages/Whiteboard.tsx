import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { WhiteboardHeader } from '../components/Header';
import ButtonPanel from '../components/ButtonPanel';
import PropertiesPanel from '../components/PropertiesPanel';
import WhiteboardCanvas from '../components/WhiteboardCanvas';
import store from '../store/RootStore';
import socketManager from "../api/SocketManager";
import { observer } from 'mobx-react-lite';

const Whiteboard: React.FC = observer(() => {
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
      <div className="canvas-container">
        <WhiteboardHeader />
        <ButtonPanel />
        <PropertiesPanel />
      </div>
      <WhiteboardCanvas />
    </div>
  );
});

export default Whiteboard;
