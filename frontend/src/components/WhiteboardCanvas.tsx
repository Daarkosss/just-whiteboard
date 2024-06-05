import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Canvas, CanvasInstance } from 'react-design-editor';
import store from '../store/RootStore';

const WhiteboardCanvas: React.FC = observer(() => {
  const canvasRef = useRef<CanvasInstance>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current?.handler.canvas;
    if (canvas) {
      store.currentBoard.setCanvas(canvas);
      store.currentBoard.setHandler(canvasRef.current?.handler)

      const handleSelection = () => {
        const activeObject = canvas.getActiveObject() as fabric.Object | null;
        store.currentBoard.setSelectedObject(activeObject);
      };

      canvas.on('selection:created', handleSelection);
      canvas.on('selection:updated', handleSelection);
      canvas.on('selection:cleared', () => {
        store.currentBoard.setSelectedObject(null);
      });

      return () => {
        canvas.off('selection:created', handleSelection);
        canvas.off('selection:updated', handleSelection);
        canvas.off('selection:cleared', () => {
          store.currentBoard.setSelectedObject(null);
        });
      };
    }
  }, []);

  return <Canvas ref={canvasRef} style={{ zIndex: 1 }} />;
});

export default WhiteboardCanvas;
