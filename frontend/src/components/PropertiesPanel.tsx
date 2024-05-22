// src/components/PropertiesPanel.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import canvasStore from '../store/CanvasStore';

const PropertiesPanel: React.FC = observer(() => {

  const handleColorChange = (colorResult: { hex: string }) => {
    console.log(canvasStore.selectedObject);
    canvasStore.setColor(colorResult.hex);
  };

  return (
    <div className="properties-panel">
      {canvasStore.selectedObject ? (
        <div>
          {canvasStore.selectedObject.type === 'textbox' ? (
            <Form>
              <Form.Group controlId="formFontSize">
                <Form.Label>Font Size</Form.Label>
                <input
                  type="number"
                  value={canvasStore.fontSize}
                  onChange={(e) => canvasStore.setFontSize(parseInt(e.target.value, 10))}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formFontFamily">
                <Form.Label>Font Family</Form.Label>
                <select
                  value={canvasStore.fontFamily}
                  onChange={(e) => canvasStore.setFontFamily(e.target.value)}
                  className="form-control"
                >
                  <option value="Arial">Arial</option>
                  <option value="Times New Roman">Times New Roman</option>
                  <option value="Courier New">Courier New</option>
                </select>
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group controlId="formObjectWidth">
                <Form.Label>Width</Form.Label>
                <input
                  type="number"
                  value={canvasStore.width}
                  onChange={(e) => canvasStore.setWidth(parseInt(e.target.value, 10))}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formObjectHeight">
                <Form.Label>Height</Form.Label>
                <input
                  type="number"
                  value={canvasStore.height}
                  onChange={(e) => canvasStore.setHeight(parseInt(e.target.value, 10))}
                  className="form-control"
                />
              </Form.Group>
            </Form>
          )}
          <Form.Group controlId="formObjectColor">
            <Form.Label>Color</Form.Label>
            <SketchPicker color={canvasStore.color} onChange={handleColorChange} />
          </Form.Group>
          <Button variant="danger" onClick={canvasStore.removeSelectedObject}>
            Remove Object
          </Button>
        </div>
      ) : (
        <p>Click an object to edit it</p>
      )}
    </div>
  );
});

export default PropertiesPanel;
