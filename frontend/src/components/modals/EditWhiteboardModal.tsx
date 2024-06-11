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
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);

  useEffect(() => {
    if (show) {
      setNewTitle(initialTitle);
      setIsSaveDisabled(initialTitle.length < 5);
    }
  }, [show, initialTitle]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewTitle(value);
    setIsSaveDisabled(value.length < 5);
  };

  const handleSaveChanges = () => {
    if (!isSaveDisabled) {
      onSave(newTitle);
      handleClose();
    }
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
              minLength={5}
              value={newTitle}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges} disabled={isSaveDisabled}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditWhiteBoardModal;
