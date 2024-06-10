// src/components/PropertiesPanel.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import { FaAngleDown, FaAngleDoubleDown, FaAngleUp, FaAngleDoubleUp } from "react-icons/fa";
import { SketchPicker } from 'react-color';
import { useTranslation } from 'react-i18next';
import store from '../store/RootStore';

const PropertiesPanel: React.FC = observer(() => {
  const { t } = useTranslation();

  const handleColorChange = (colorResult: { hex: string }) => {
    console.log(store.boards.currentBoard.selectedObject);
    store.boards.currentBoard.setColor(colorResult.hex);
  };

  return (
    <div>
      {store.boards.currentBoard.selectedObject &&
        <div className="properties-panel" style={{zIndex: 3}}>
          {store.boards.currentBoard.selectedObject.type === 'textbox' ? (
            <Form>
              <Form.Group controlId="formFontSize" className='form-group'>
                <Form.Label>{t('fontSize')}</Form.Label>
                <input
                  type="number"
                  value={store.boards.currentBoard.fontSize}
                  onChange={(e) => store.boards.currentBoard.setFontSize(parseInt(e.target.value, 10))}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formFontFamily" className='form-group'>
                <Form.Label>{t('fontFamily')}</Form.Label>
                <select
                  value={store.boards.currentBoard.fontFamily}
                  onChange={(e) => store.boards.currentBoard.setFontFamily(e.target.value)}
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
                  value={store.boards.currentBoard.width}
                  onChange={(e) => store.boards.currentBoard.setWidth(parseInt(e.target.value, 10))}
                  className="form-control"
                />
              </Form.Group>
              <Form.Group controlId="formObjectHeight" className='form-group'>
                <Form.Label>{t('height')}</Form.Label>
                <input
                  type="number"
                  value={store.boards.currentBoard.height}
                  onChange={(e) => store.boards.currentBoard.setHeight(parseInt(e.target.value, 10))}
                  className="form-control"
                />
              </Form.Group>
            </Form>
          )}
          <Form.Group controlId="formObjectLayer" className='form-group-layer'>
            <Form.Label>{t('layer')}</Form.Label>
            <ButtonGroup className="layer-buttons">
              <Button className="button" onClick={() => store.boards.currentBoard.bringForward()}>
                <FaAngleUp size={20} />
              </Button>
              <Button className="button" onClick={() =>store.boards.currentBoard.sendBackwards()}>
                <FaAngleDown size={20} />
              </Button>
              <Button className="button" onClick={() => store.boards.currentBoard.bringToFront()}>
                <FaAngleDoubleUp size={20} />
              </Button>
              <Button className="button" onClick={() => store.boards.currentBoard.sendToBack()}>
                <FaAngleDoubleDown size={20} />
              </Button>
            </ButtonGroup>
          </Form.Group>
          <Form.Group controlId="formObjectColor">
            <Form.Label>{t('color')}</Form.Label>
            <SketchPicker color={store.boards.currentBoard.color} onChange={handleColorChange} />
          </Form.Group>
          <Button variant="danger" onClick={() => store.boards.currentBoard.removeSelectedObject()}>
            {t('removeObject')}
          </Button>
        </div>
      }
    </div>
  );
});

export default PropertiesPanel;
