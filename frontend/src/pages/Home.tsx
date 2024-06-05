import React, { useState } from 'react';
import WhiteboardThumbnail from '../components/WhiteboardThumbnail';
import AddWhiteboardModal from '../components/modals/AddWhiteboardModal';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HomeHeader } from '../components/Header';
import { useStore } from '../store/StoreProvider';

const initialWhiteboards = [
  { id: '1', title: 'Whiteboard 1' },
  { id: '2', title: 'Whiteboard 2' },
  { id: '3', title: 'Whiteboard 3' },
  { id: '4', title: 'Whiteboard 4' },
];

const Home: React.FC = () => {
  const { userStore } = useStore();
  const { t } = useTranslation();
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


  const Login = () => {
    fetch('https://localhost:3000/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userStore.user?.userToken}`  // Dodaj token JWT tutaj
      },
      body: JSON.stringify({
        email: userStore.user?.email
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  
  return (
    <div>
      <HomeHeader />
      <button onClick={Login}>Login</button>
      <div className="home-container">
        <div className="add-button-container">
          <Button className="add-button" variant="primary" onClick={handleOpenModal}>
            {t('addWhiteboard')}
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
