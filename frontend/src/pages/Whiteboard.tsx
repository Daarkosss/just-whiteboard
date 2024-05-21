import React, { useRef, useState, useEffect } from 'react';
import { Canvas, CanvasInstance } from 'react-design-editor';
import { fabric } from 'fabric';
import { Button, ButtonGroup, Form, FormControl } from 'react-bootstrap';
import { SketchPicker, ColorResult } from 'react-color';
import { FaSquare, FaCircle } from 'react-icons/fa';
import { BsFillTriangleFill } from "react-icons/bs";
import { RiFontSize2 } from "react-icons/ri";
import '../scss/main.scss';

const Whiteboard: React.FC = () => {
  const canvasRef = useRef<CanvasInstance>(null);
  const [color, setColor] = useState<string>('#000000');
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current?.handler.canvas;
    if (canvas) {
      const handleSelection = () => {
        const activeObject = canvas.getActiveObject() as fabric.Object | null;
        setSelectedObject(activeObject);
        setColor((activeObject?.get('fill') as string) || '#000000'); // Ustawienie koloru wybranego obiektu
      };

      canvas.on('selection:created', handleSelection);
      canvas.on('selection:updated', handleSelection);
      canvas.on('selection:cleared', () => {
        setSelectedObject(null);
        setColor('#000000'); // Resetowanie koloru, gdy nic nie jest zaznaczone
      });

      return () => {
        canvas.off('selection:created', handleSelection);
        canvas.off('selection:updated', handleSelection);
        canvas.off('selection:cleared', () => {
          setSelectedObject(null);
          setColor('#000000'); // Resetowanie koloru, gdy nic nie jest zaznaczone
        });
      };
    }
  }, []);

  const addRectangle = () => {
    const canvas = canvasRef.current?.handler.canvas;
    if (canvas) {
      const rect = new fabric.Rect({
        width: 200,
        height: 100,
        left: 850,
        top: 400,
      });
      canvas.add(rect);
      canvas.setActiveObject(rect);
      canvas.renderAll();
    }
  };

  const addTriangle = () => {
    const canvas = canvasRef.current?.handler.canvas;
    if (canvas) {
      const triangle = new fabric.Triangle({
        width: 100,
        height: 100,
        left: 850,
        top: 400,
        fill: 'rgba(0, 0, 255, 0.2)',
      });
      canvas.add(triangle);
      canvas.setActiveObject(triangle);
      canvas.renderAll();
    }
  };

  const addCircle = () => {
    const canvas = canvasRef.current?.handler.canvas;
    if (canvas) {
      const circle = new fabric.Circle({
        radius: 50,
        left: 850,
        top: 400,
        fill: 'rgba(0, 255, 0, 0.2)',
      });
      canvas.add(circle);
      canvas.setActiveObject(circle);
      canvas.renderAll();
    }
  };

  const addText = () => {
    const canvas = canvasRef.current?.handler.canvas;
    if (canvas) {
      const text = new fabric.Textbox('text', {
        left: 850,
        top: 400,
        fill: 'rgba(255, 0, 0, 0.7)',
      });
      canvas.add(text);
      canvas.setActiveObject(text);
      canvas.renderAll();
    }
  };

  const handleColorChange = (colorResult: ColorResult) => {
    const newColor = colorResult.hex;
    setColor(newColor);
    if (selectedObject) {
      selectedObject.set('fill', newColor);
      canvasRef.current?.handler.canvas.renderAll();
    }
  };

  const removeSelectedObject = () => {
    canvasRef.current?.handler.remove();
  };

  return (
    <div>
      <Canvas 
        ref={canvasRef}
        style={{ zIndex: 1 }} 
      />
      <div className='canvas-container'>
        <div className="header">
          <div>Whiteboard</div>
          <Button variant="danger">Leave</Button>
        </div>
        <ButtonGroup vertical className="buttons-container">
          <Button className="button" onClick={addRectangle}>
            <FaSquare /> Add Rectangle
          </Button>
          <Button className="button" onClick={addTriangle}>
            <BsFillTriangleFill /> Add Triangle
          </Button>
          <Button className="button" onClick={addCircle}>
            <FaCircle /> Add Circle
          </Button>
          <Button className="button" onClick={addText}>
            <RiFontSize2 /> Add Text
          </Button>
        </ButtonGroup>
        <div className="properties-panel">
          {selectedObject ? (
            <div>
              {selectedObject.type === 'textbox' ? (
                <Form>
                  <Form.Group controlId="formFontSize">
                    <Form.Label>Font Size</Form.Label>
                    <FormControl
                      type="number"
                      value={(selectedObject as fabric.Textbox).fontSize || ''}
                      onChange={(e) => {
                        const fontSize = parseInt(e.target.value, 10);
                        (selectedObject as fabric.Textbox).set('fontSize', fontSize);
                        canvasRef.current?.handler.canvas.renderAll();
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formFontFamily">
                    <Form.Label>Font Family</Form.Label>
                    <FormControl
                      as="select"
                      value={(selectedObject as fabric.Textbox).fontFamily || ''}
                      onChange={(e) => {
                        (selectedObject as fabric.Textbox).set('fontFamily', e.target.value);
                        canvasRef.current?.handler.canvas.renderAll();
                      }}
                    >
                      <option value="Arial">Arial</option>
                      <option value="Helvetica">Helvetica</option>
                      <option value="Times New Roman">Times New Roman</option>
                      <option value="Courier New">Courier New</option>
                    </FormControl>
                  </Form.Group>
                </Form>
              ) : (
                <Form>
                  <Form.Group controlId="formObjectWidth">
                    <Form.Label>Width</Form.Label>
                    <FormControl
                      type="number"
                      value={selectedObject.get('width') || ''}
                      onChange={(e) => {
                        const width = parseInt(e.target.value, 10);
                        selectedObject.set('width', width);
                        canvasRef.current?.handler.canvas.renderAll();
                      }}
                    />
                  </Form.Group>
                  <Form.Group controlId="formObjectHeight">
                    <Form.Label>Height</Form.Label>
                    <FormControl
                      type="number"
                      value={selectedObject.get('height') || ''}
                      onChange={(e) => {
                        const height = parseInt(e.target.value, 10);
                        selectedObject.set('height', height);
                        canvasRef.current?.handler.canvas.renderAll();
                      }}
                    />
                  </Form.Group>
                </Form>
              )}
              <Form.Group controlId="formObjectColor">
                <Form.Label>Color</Form.Label>
                <SketchPicker color={color} onChange={handleColorChange} />
              </Form.Group>
              <Button variant="danger" onClick={removeSelectedObject}>
                Remove Object
              </Button>
            </div>
          ) : (
            <p>Click an object to edit it</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Whiteboard;
