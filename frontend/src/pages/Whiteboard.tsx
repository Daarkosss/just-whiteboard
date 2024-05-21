import React, { useRef, useState } from 'react';
import { Canvas, CanvasInstance } from 'react-design-editor';
import { fabric } from 'fabric';
import { Button, ButtonGroup, Popover, OverlayTrigger } from 'react-bootstrap';
import { SketchPicker, ColorResult } from 'react-color';
import '../scss/main.scss';

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<CanvasInstance>(null);
  const [color, setColor] = useState<string>('#000000'); // Domyślny kolor

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
      <Popover>
        <SketchPicker
          color={color}
          onChange={handleColorChange}
        />
      </Popover>
    </Popover>
  );

  return (
    <div className='canvas-container'>
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
