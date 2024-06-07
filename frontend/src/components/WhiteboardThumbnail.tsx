// src/components/WhiteboardThumbnail.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importuj ikonę usuwania
import EditWhiteBoardModal from './modals/EditWhiteboardModal';
import DeleteWhiteBoardModal from './modals/DeleteWhiteboardModal'; // Importuj modal usuwania
import { Board } from '../api/api';
import store from '../store/RootStore';

interface WhiteboardThumbnailProps {
  board: Board;
  onUpdateTitle: (id: string, newTitle: string) => void;
}

const WhiteboardThumbnail: React.FC<WhiteboardThumbnailProps> = ({ board, onUpdateTitle }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); // Stan dla modalu usuwania
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/whiteboard/${board._id}`);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleSaveChanges = (newTitle: string) => {
    onUpdateTitle(board._id, newTitle);
    setShowEditModal(false);
  };

  const handleDeleteBoard = () => {
    store.boards.deleteBoard(board._id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <Card border="dark" className="whiteboard-thumbnail" onClick={handleClick}>
        <Card.Header className="d-flex justify-content-between align-items-center">
          <span>{board.name}</span>
          <div className="action-buttons">
            {board.owner === store.auth.user?._id && (
              <>
                <FaEdit className="edit-icon" size={20} onClick={handleEditClick} />
                <FaTrash className="delete-icon" size={20} onClick={handleDeleteClick} />
              </>
            )}
          </div>
        </Card.Header>
        <Card.Img variant="top" src={board.dataUrl} />
      </Card>
      <EditWhiteBoardModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        initialTitle={board.name}
        onSave={handleSaveChanges}
        title={board.name}
      />
      <DeleteWhiteBoardModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        onDelete={handleDeleteBoard}
        title={board.name}
      />
    </>
  );
};

export default WhiteboardThumbnail;
