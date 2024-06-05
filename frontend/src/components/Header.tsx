import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import store from '../store/RootStore';

export const LoginHeader: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="sticky-header">
      <h1 className='title'>
        {t('appTitle')}
      </h1>
    </div>
  );
};

export const HomeHeader: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = () => {
    store.auth.logout();
    navigate('/');
  };

  return (
    <div className="sticky-header">
      <div className="avatar-container">
        {<img src={store.auth.user?.avatar} alt="avatar" className="avatar" />}
        <div>{store.auth.user?.name}</div>
      </div>
      <h1 className='title'>{t('availableWhiteboards')}</h1>
      <Button className="leave-button" variant="danger" onClick={handleLogout}>{t('logout')}</Button>
    </div>
  );
};

export const WhiteboardHeader: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate('/');
  };

  return (
    <div className="sticky-header-full-width">
      <div className="avatar-container">
        {<img src={store.auth.user?.avatar} alt="avatar" className="avatar" />}
        <div>{store.auth.user?.name}</div>
      </div>
      <h1 className='title'>{t('whiteboard')}</h1>
      <Button className="leave-button" variant="danger" onClick={handleLeave}>{t('leave')}</Button>
    </div>
  );
};