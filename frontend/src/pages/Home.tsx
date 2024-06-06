import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import WhiteboardThumbnail from '../components/WhiteboardThumbnail';
import AddWhiteboardModal from '../components/modals/AddWhiteboardModal';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { HomeHeader } from '../components/Header';
import store from '../store/RootStore';

const Home: React.FC = observer(() => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log(store.auth.user?._id);
    store.boards.fetchBoards();
  }, []);

  const handleUpdateTitle = (id: string, newTitle: string) => {
    store.boards.updateBoard(id, newTitle);
  };

  const handleAddWhiteboard = (title: string) => {
    store.boards.createBoard(title);
  };
  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  return (
    <div>
      <HomeHeader />
      <div className="home-container">
        <div className="add-button-container">
          <Button className="add-button" variant="primary" onClick={handleOpenModal}>
            {t('addWhiteboard')}
          </Button>
        </div>
        <div className="whiteboard-grid">
          {store.boards.boards.map((board) => (
            <WhiteboardThumbnail
              key={board._id}
              id={board._id}
              title={board.name}
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
});

export default Home;
