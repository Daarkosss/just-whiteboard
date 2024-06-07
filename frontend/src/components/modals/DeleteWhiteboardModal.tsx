import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface DeleteWhiteBoardModalProps {
  show: boolean;
  handleClose: () => void;
  onDelete: () => void;
  title: string;
}

const DeleteWhiteBoardModal: React.FC<DeleteWhiteBoardModalProps> = ({ show, handleClose, onDelete, title }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Whiteboard: {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this whiteboard?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteWhiteBoardModal;
