import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate('/');
  };

  return (
    <div className="sticky-header-full-width">
      <h1 className='title'>{t('whiteboard')}</h1>
      <Button className="leave-button" variant="danger" onClick={handleLeave}>{t('leave')}</Button>
    </div>
  );
};

export default Header;
