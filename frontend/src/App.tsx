import React, { useEffect } from 'react';
import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Whiteboard from './pages/Whiteboard';
import store from './store/RootStore';
import './scss/main.scss';
import LoginPage from './pages/LoginPage';

const App: React.FC = observer(() => {
  const location = useLocation();

  useEffect(() => {
    const protectedRoutes = ['/home', '/whiteboard'];
    if (protectedRoutes.some(route => location.pathname.startsWith(route))) {
      store.auth.login();
    }
  }, [location]);

  return (
    <div>
      <Routes>
        {store.auth.user?._id ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/whiteboard/:id" element={<Whiteboard />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
});

export default App;
