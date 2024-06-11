import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

interface AddWhiteboardModalProps {
  show: boolean;
  handleClose: () => void;
  onAddWhiteboard: (title: string) => void;
}

const AddWhiteboardModal: React.FC<AddWhiteboardModalProps> = ({ show, handleClose, onAddWhiteboard }) => {
  const [newTitle, setNewTitle] = useState('');
  const [isAddDisabled, setIsAddDisabled] = useState(true);

  useEffect(() => {
    if (show) {
      setNewTitle('');
    }
  }, [show]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value);
    setNewTitle(value);
    setIsAddDisabled(value.length < 5);
  };

  const handleSaveChanges = () => {
    onAddWhiteboard(newTitle);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Whiteboard</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formNewTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={newTitle}
              minLength={5}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveChanges} disabled={isAddDisabled}>
          Add Whiteboard
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddWhiteboardModal;
