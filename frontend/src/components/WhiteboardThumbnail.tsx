// src/components/WhiteboardThumbnail.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import EditWhiteBoardModal from './modals/EditWhiteboardModal';
import { Board } from '../api/api';
import store from '../store/RootStore';

interface WhiteboardThumbnailProps {
  board: Board;
  onUpdateTitle: (id: string, newTitle: string) => void;
}

const WhiteboardThumbnail: React.FC<WhiteboardThumbnailProps> = ({ board, onUpdateTitle }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/whiteboard/${board._id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSaveChanges = (newTitle: string) => {
    onUpdateTitle(board._id, newTitle);
    setShowModal(false);
  };
  console.log(board.owner, store.auth.user?._id);

  return (
    <>
      <Card border="dark" className="whiteboard-thumbnail" onClick={handleClick}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>{board.name}</span>
          {board.owner === store.auth.user?._id && <FaEdit className="edit-icon" onClick={handleEditClick} />}
        </Card.Header>
        <Card.Img variant="top" src={board.dataUrl} />
      </Card>
      <EditWhiteBoardModal
        show={showModal}
        handleClose={handleCloseModal}
        initialTitle={board.name}
        onSave={handleSaveChanges}
        title={board.name}
      />
    </>
  );
};

export default WhiteboardThumbnail;
