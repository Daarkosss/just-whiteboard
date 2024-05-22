// src/components/WhiteboardThumbnail.tsx
import React, { useEffect, useState } from 'react';
import { fabric } from 'fabric';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import EditWhiteBoardModal from './modals/EditWhiteboardModal';

interface WhiteboardThumbnailProps {
  id: string;
  title: string;
  onUpdateTitle: (id: string, newTitle: string) => void;
}

const WhiteboardThumbnail: React.FC<WhiteboardThumbnailProps> = ({ id, title, onUpdateTitle }) => {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const canvasElement = document.createElement('canvas');
    canvasElement.width = 400;
    canvasElement.height = 250;
    const canvas = new fabric.Canvas(canvasElement, {
      selection: false,
      hoverCursor: 'default',
    });

    // Dodawanie przykładowych elementów
    const rect = new fabric.Rect({
      width: 50,
      height: 50,
      left: Math.random() * 100,
      top: Math.random() * 100,
      fill: 'red',
    });

    const circle = new fabric.Circle({
      radius: 25,
      left: Math.random() * 100,
      top: Math.random() * 100,
      fill: 'green',
    });

    canvas.add(rect, circle);

    const dataUrl = canvas.toDataURL({
      format: 'png',
      multiplier: 1,
    });

    setDataUrl(dataUrl);

    // Cleanup canvas on component unmount
    return () => {
      canvas.dispose();
    };
  }, []);

  const handleClick = () => {
    navigate(`/whiteboard/${id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = (newTitle: string) => {
    onUpdateTitle(id, newTitle);
    setShowModal(false);
  };

  return (
    <>
      <Card border="dark" className="whiteboard-thumbnail" onClick={handleClick}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>{title}</span>
          <FaEdit className="edit-icon" onClick={handleEditClick} />
        </Card.Header>
        {dataUrl && <Card.Img variant="top" src={dataUrl} />}
      </Card>
      <EditWhiteBoardModal
        show={showModal}
        handleClose={handleCloseModal}
        initialTitle={title}
        onSave={handleSaveChanges}
        title={title}
      />
    </>
  );
};

export default WhiteboardThumbnail;
