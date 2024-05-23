import React from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../store/UserStore';

const LogoutButton: React.FC = observer(() => {
  const handleLogout = () => {
    userStore.logout();
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
});

export default LogoutButton;
