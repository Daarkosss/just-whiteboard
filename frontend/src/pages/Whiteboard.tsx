import React, { useRef, useState, useEffect } from 'react';
import { Canvas, CanvasInstance } from 'react-design-editor';
import { fabric } from 'fabric';
import { Button, ButtonGroup, Popover, OverlayTrigger } from 'react-bootstrap';
import { SketchPicker, ColorResult } from 'react-color';
import '../scss/main.scss';

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<CanvasInstance>(null);
  const [color, setColor] = useState<string>('#000000'); // Domyślny kolor
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [otherCursorPosition, setOtherCursorPosition] = useState<{ x: number; y: number }>({ x: 50, y: 50 }); // Pozycja "innego użytkownika"

  useEffect(() => {
    const canvas = canvasRef.current?.handler.canvas;
    const handleMouseMove = (event: fabric.IEvent) => {
      const pointer = canvas?.getPointer(event.e);
      if (pointer) {
        setCursorPosition({ x: pointer.x, y: pointer.y });
        // Aktualizuj pozycję "innego użytkownika" na podstawie naszego kursora z jakąś deltą
        setOtherCursorPosition({ x: pointer.x + 50, y: pointer.y + 50 });
      }
    };

    canvas?.on('mouse:move', handleMouseMove);

    return () => {
      canvas?.off('mouse:move', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    // Dodaj wskaźnik "innego użytkownika" do kanwy
    const canvas = canvasRef.current?.handler.canvas;
    if (!canvas) return;

    let otherCursor = findObjectByName(canvas, 'otherCursor');
    if (!otherCursor) {
      otherCursor = new fabric.Circle({
        name: 'otherCursor',
        radius: 5,
        fill: 'red',
        left: otherCursorPosition.x,
        top: otherCursorPosition.y,
        selectable: false,
        evented: false,
      });
      canvas.add(otherCursor);
    }

    otherCursor.set({ left: otherCursorPosition.x, top: otherCursorPosition.y });
    otherCursor.setCoords();
    canvas.requestRenderAll();
  }, [otherCursorPosition]);

  const findObjectByName = (canvas: fabric.Canvas, name: string): fabric.Object | undefined => {
    return canvas.getObjects().find(obj => obj.name === name);
  };

  const addRectangle = () => {
    const rect = new fabric.Rect({
      width: 200,
      height: 100,
      left: 50,
      top: 50,
      fill: 'rgba(0, 0, 0, 0.2)',
    });
    canvasRef?.current?.handler.add(rect);
  };

  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      fill: 'rgba(0, 0, 255, 0.2)',
    });
    canvasRef?.current?.handler.add(triangle);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      radius: 50,
      left: 150,
      top: 150,
      fill: 'rgba(0, 255, 0, 0.2)',
    });
    canvasRef?.current?.handler.add(circle);
  };

  const addText = () => {
    const text = new fabric.Textbox('Hello Fabric', {
      left: 200,
      top: 200,
      fill: 'rgba(255, 0, 0, 0.7)',
    });
    canvasRef?.current?.handler.add(text);
  };

  const handleColorChange = (colorResult: ColorResult) => {
    const newColor = colorResult.hex;
    setColor(newColor);
    canvasRef?.current?.handler.setObject({ fill: newColor });
  };

  const colorPickerPopover = (
    <Popover id="color-picker-popover">
      <Popover.Body>
        <SketchPicker
          color={color}
          onChange={handleColorChange}
        />
      </Popover.Body>
    </Popover>
  );

  return (
    <div className='canvas-container'>
      <div className="cursor-position">
        Cursor Position: X: {cursorPosition.x}, Y: {cursorPosition.y}
      </div>
      <ButtonGroup vertical className="buttons-container">
        <Button className="button" onClick={addRectangle}>Add Rectangle</Button>
        <Button className="button" onClick={addTriangle}>Add Triangle</Button>
        <Button className="button" onClick={addCircle}>Add Circle</Button>
        <Button className="button" onClick={addText}>Add Text</Button>
        <OverlayTrigger trigger="click" placement="right" overlay={colorPickerPopover} rootClose>
          <Button className="button">Choose Color</Button>
        </OverlayTrigger>
      </ButtonGroup>
      <Canvas
        ref={canvasRef}
        style={{ zIndex: 1 }}
      />
    </div>
  );
};

export default Whiteboard;
