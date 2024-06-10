import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Canvas, CanvasInstance } from 'react-design-editor';
import store from '../store/RootStore';
import { MoonLoader } from 'react-spinners';
import { fabric } from 'fabric';

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
      store.boards.currentBoard.setHandler(canvasRef.current?.handler);

      const handleSelection = () => {
        const activeObject = canvas.getActiveObject() as fabric.Object | null;
        store.boards.currentBoard.setSelectedObject(activeObject);
      };

      canvas.on('selection:created', handleSelection);
      canvas.on('selection:updated', handleSelection);
      canvas.on('selection:cleared', () => {
        store.boards.currentBoard.setSelectedObject(null);
      });

      const handleMouseMove = (event: fabric.IEvent<MouseEvent>) => {
        const e = event.e as MouseEvent;
        const pointer = canvas.getPointer(e);
        console.log('Cursor position:', pointer.x, pointer.y);
        store.boards.currentBoard.setCursorPosition(pointer.x, pointer.y);
      };

      canvas.on('mouse:move', handleMouseMove);

      return () => {
        canvas.off('selection:created', handleSelection);
        canvas.off('selection:updated', handleSelection);
        canvas.off('selection:cleared', () => {
          store.boards.currentBoard.setSelectedObject(null);
        });
        
        canvas.off('mouse:move', handleMouseMove as unknown as (e: fabric.IEvent<Event>) => void);
      };
    }
  }, []);

  const userPositions = store.boards.currentBoard.getUserPositions();
  const canvas = canvasRef.current?.handler.canvas;
  const canvasWidth = canvas?.getWidth() || 0;
  const canvasHeight = canvas?.getHeight() || 0;

  const getTransformedPosition = (left: number, top: number) => {
    if (!canvas) return { left, top };
    const zoom = canvas.getZoom();
    const vpt = canvas.viewportTransform;
    if (!vpt) return { left, top };
    const x = (left * zoom) + vpt[4];
    const y = (top * zoom) + vpt[5];
    return { left: x, top: y };
  };


  return (
    <div>
      <Canvas ref={canvasRef} style={canvasStyle} />
      {Object.keys(userPositions).map(userId => {
        const { userPhoto, mouseLeft, mouseTop } = userPositions[userId];
        const { left, top } = getTransformedPosition(mouseLeft, mouseTop);
        if (left < 0 || top < 0 || left > canvasWidth -10 || top > canvasHeight -10) {
          return null;
        }
        return (
          <img
            key={userId}
            src={userPhoto}
            alt={`cursor-${userId}`}
            style={{
              position: 'absolute',
              left: left,
              top: top,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 2,
            }}
          />
        );
      })}
      {store.boards.isLoading && (
        <div className="spinner-container">
          <MoonLoader color="#0b5ed7" size={70} speedMultiplier={2} />
        </div>
      )}
    </div>
  );
});

export default WhiteboardCanvas;
