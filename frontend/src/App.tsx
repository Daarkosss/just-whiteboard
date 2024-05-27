import React from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Whiteboard from './pages/Whiteboard';
import userStore from './store/UserStore';
import './scss/main.scss';

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  return userStore.user ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route 
          path="/login" 
          element={<LoginPage />} 
        />
        <Route 
          path="/home" 
          element={<PrivateRoute element={<Home />} />} 
        />
        <Route 
          path="/whiteboard/:id"
          element={<PrivateRoute element={<Whiteboard />} />} 
        />
        <Route 
          path="/" 
          element={<Navigate to="/home" />} 
        />
      </Routes>
    </div>
  );
};

export default App;
