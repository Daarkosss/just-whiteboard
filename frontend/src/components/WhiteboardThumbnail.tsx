import React, { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import { useNavigate } from 'react-router-dom';

interface WhiteboardThumbnailProps {
  id: string;
}

const WhiteboardThumbnail: React.FC<WhiteboardThumbnailProps> = ({ id }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      selection: false,
      hoverCursor: 'default',
    });

    // Ustawienie białego tła
    canvas.setBackgroundColor('white', canvas.renderAll.bind(canvas));

    // Dodawanie przykładowych elementów
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      left: Math.random() * 200,
      top: Math.random() * 200,
      fill: 'red',
      selectable: false,
      evented: false,
    });

    const circle = new fabric.Circle({
      radius: 25,
      left: Math.random() * 100,
      top: Math.random() * 100,
      fill: 'green',
      selectable: false,
      evented: false,
    });

    canvas.add(rect, circle);

    return () => {
      canvas.dispose();
    };
  }, []);

  const handleClick = () => {
    navigate(`/whiteboard/${id}`);
  };

  return (
    <div className="whiteboard-thumbnail" onClick={handleClick}>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default WhiteboardThumbnail;
