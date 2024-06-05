// src/components/ButtonPanel.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { Button, ButtonGroup } from 'react-bootstrap';
import { FaSquare, FaCircle } from 'react-icons/fa';
import { BsFillTriangleFill } from 'react-icons/bs';
import { RiFontSize2 } from 'react-icons/ri';
import { fabric } from 'fabric';
import { useTranslation } from 'react-i18next';
import store from '../store/RootStore';

const ButtonPanel: React.FC = observer(() => {
  const { t } = useTranslation();

  const addRectangle = () => {
    const canvas = store.currentBoard.canvas;
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
    const canvas = store.currentBoard.canvas;
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
    const canvas = store.currentBoard.canvas;
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
    const canvas = store.currentBoard.canvas;
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

  return (
    <ButtonGroup vertical className="buttons-container">
      <Button className="button" onClick={addRectangle}>
        <FaSquare /> {t('addRectangle')}
      </Button>
      <Button className="button" onClick={addTriangle}>
        <BsFillTriangleFill /> {t('addTriangle')}
      </Button>
      <Button className="button" onClick={addCircle}>
        <FaCircle /> {t('addCircle')}
      </Button>
      <Button className="button" onClick={addText}>
        <RiFontSize2 /> {t('addText')}
      </Button>
    </ButtonGroup>
  );
});

export default ButtonPanel;
