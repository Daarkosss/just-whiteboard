import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Canvas, CanvasInstance } from 'react-design-editor';
import store from '../store/RootStore';
import { MoonLoader } from 'react-spinners';

const WhiteboardCanvas: React.FC = observer(() => {
  const canvasRef = useRef<CanvasInstance>(null);

  const canvasStyle = {
    zIndex: 1,
    visibility: store.boards.isLoading ? 'hidden' : 'visible',
  } as React.CSSProperties;
  
  useEffect(() => {
    const canvas = canvasRef.current?.handler.canvas;
    if (canvas) {
      store.boards.currentBoard.setCanvas(canvas);
      store.boards.currentBoard.setHandler(canvasRef.current?.handler)

      const handleSelection = () => {
        const activeObject = canvas.getActiveObject() as fabric.Object | null;
        store.boards.currentBoard.setSelectedObject(activeObject);
      };

      canvas.on('selection:created', handleSelection);
      canvas.on('selection:updated', handleSelection);
      canvas.on('selection:cleared', () => {
        store.boards.currentBoard.setSelectedObject(null);
      });

      return () => {
        canvas.off('selection:created', handleSelection);
        canvas.off('selection:updated', handleSelection);
        canvas.off('selection:cleared', () => {
          store.boards.currentBoard.setSelectedObject(null);
        });
      };
    }
  }, []);

  return <div>
    <Canvas ref={canvasRef} style={canvasStyle} />
    {store.boards.isLoading && <div className="spinner-container">
      <MoonLoader color="#0b5ed7" size={70} speedMultiplier={2}/>
    </div>}
  </div>;
});

export default WhiteboardCanvas;
