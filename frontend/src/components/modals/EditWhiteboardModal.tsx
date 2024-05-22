import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface EditTitleModalProps {
  show: boolean;
  handleClose: () => void;
  initialTitle: string;
  onSave: (newTitle: string) => void;
  title: string;
}

const EditWhiteBoardModal: React.FC<EditTitleModalProps> = ({ show, handleClose, initialTitle, onSave, title }) => {
  const [newTitle, setNewTitle] = useState(initialTitle);

  useEffect(() => {
    if (show) {
      setNewTitle(initialTitle);
    }
  }, [show, initialTitle]);

  const handleSaveChanges = () => {
    onSave(newTitle);
    handleClose();
  };

  return (
    <Modal className="edit-title-modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Whiteboard: {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditWhiteBoardModal;
