import { useRef } from 'react'
import { Canvas, CanvasInstance } from 'react-design-editor'
import { fabric } from 'fabric';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import '../scss/main.scss'

const CanvasComponent: React.FC = () => {
  const canvasRef = useRef<CanvasInstance>();

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

  return (
    <div className='canvas-container'>
      <ButtonGroup vertical className="buttons-container">
        <Button className="button" onClick={addRectangle}>Add Rectangle</Button>
        <Button className="button" onClick={addTriangle}>Add Triangle</Button>
        <Button className="button" onClick={addCircle}>Add Circle</Button>
        <Button className="button" onClick={addText}>Add Text</Button>
      </ButtonGroup>
      <Canvas
        ref={canvasRef}
        style={{ zIndex: 1 }}
      />
    </div>
  )
}

export default CanvasComponent;
