// src/components/WhiteboardThumbnail.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import EditWhiteBoardModal from './modals/EditWhiteboardModal';
import store from '../store/RootStore';

interface WhiteboardThumbnailProps {
  id: string;
  title: string;
  onUpdateTitle: (id: string, newTitle: string) => void;
}

const WhiteboardThumbnail: React.FC<WhiteboardThumbnailProps> = ({ id, title, onUpdateTitle }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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
        <Card.Img variant="top" src={store.boards.boards.find((board) => board._id === id)?.dataUrl} />
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
