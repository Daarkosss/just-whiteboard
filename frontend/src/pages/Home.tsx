import React, { useState } from 'react';
import WhiteboardThumbnail from '../components/WhiteboardThumbnail';
import AddWhiteboardModal from '../components/modals/AddWhiteboardModal';
import { Button } from 'react-bootstrap';

const initialWhiteboards = [
  { id: '1', title: 'Whiteboard 1' },
  { id: '2', title: 'Whiteboard 2' },
  { id: '3', title: 'Whiteboard 3' },
  { id: '4', title: 'Whiteboard 4' },
];

const Home: React.FC = () => {
  const [whiteboards, setWhiteboards] = useState(initialWhiteboards);
  const [showModal, setShowModal] = useState(false);

  const handleUpdateTitle = (id: string, newTitle: string) => {
    setWhiteboards((prevWhiteboards) =>
      prevWhiteboards.map((whiteboard) =>
        whiteboard.id === id ? { ...whiteboard, title: newTitle } : whiteboard
      )
    );
  };

  const handleAddWhiteboard = (title: string) => {
    const newId = (whiteboards.length + 1).toString();
    setWhiteboards([...whiteboards, { id: newId, title }]);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="sticky-header">
        <h1 className='title'>
          Available Whiteboards
        </h1>
      </div>
      <div className="home-container">
        <div className="add-button-container">
          <Button className="add-button" variant="light" onClick={handleOpenModal}>
            Add New Whiteboard
          </Button>
        </div>
        <div className="whiteboard-grid">
          {whiteboards.map((whiteboard) => (
            <WhiteboardThumbnail
              key={whiteboard.id}
              id={whiteboard.id}
              title={whiteboard.title}
              onUpdateTitle={handleUpdateTitle}
            />
          ))}
        </div>
        <AddWhiteboardModal
          show={showModal}
          handleClose={handleCloseModal}
          onAddWhiteboard={handleAddWhiteboard}
        />
      </div>
    </div>
    
  );
};

export default Home;
