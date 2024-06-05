// src/components/PropertiesPanel.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button } from 'react-bootstrap';
import { SketchPicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/StoreProvider';

const PropertiesPanel: React.FC = observer(() => {
  const { canvasStore } = useStore();
  const { t } = useTranslation();

  const handleColorChange = (colorResult: { hex: string }) => {
    console.log(canvasStore.selectedObject);
    canvasStore.setColor(colorResult.hex);
  };

  return (
    <div>
      {canvasStore.selectedObject ? (
        <div className="properties-panel">
          {canvasStore.selectedObject.type === 'textbox' ? (
            <Form>
              <Form.Group controlId="formFontSize" className='form-group'>
                <Form.Label>{t('fontSize')}</Form.Label>
                <input
                  type="number"
                  value={canvasStore.fontSize}
                  onChange={(e) => canvasStore.setFontSize(parseInt(e.target.value, 10))}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formFontFamily" className='form-group'>
                <Form.Label>{t('fontFamily')}</Form.Label>
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
              <Form.Group controlId="formObjectWidth" className='form-group'>
                <Form.Label>{t('width')}</Form.Label>
                <input
                  type="number"
                  value={canvasStore.width}
                  onChange={(e) => canvasStore.setWidth(parseInt(e.target.value, 10))}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formObjectHeight" className='form-group'>
                <Form.Label>{t('height')}</Form.Label>
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
            <Form.Label>{t('color')}</Form.Label>
            <SketchPicker color={canvasStore.color} onChange={handleColorChange} />
          </Form.Group>
          <Button variant="danger" onClick={() => canvasStore.removeSelectedObject()}>
            {t('removeObject')}
          </Button>
        </div>
      ) : (
        <p>Click an object to edit it</p>
      )}
    </div>
  );
});

export default PropertiesPanel;
