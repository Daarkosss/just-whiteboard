import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/UserStore';
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
  const navigate = useNavigate();

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

  const handleLogout = () => {
    userStore.logout();
    navigate('/');
  };

  return (
    <div>
      <div className="sticky-header">
        <h1 className='title'>
          Available Whiteboards
        </h1>
        <Button className="leave-button" variant="danger" onClick={handleLogout}>Logout</Button>
      </div>
      <div className="home-container">
        <div className="add-button-container">
          <Button className="add-button" variant="primary" onClick={handleOpenModal}>
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
