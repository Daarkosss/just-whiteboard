import React, { useEffect } from 'react';
import { Routes, Route, Navigate  } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Whiteboard from './pages/Whiteboard';
import store from './store/RootStore';
import './scss/main.scss';

const PrivateRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
  return store.auth.user ? element : <Navigate to="/login" />;
};

const App: React.FC = observer(() => {
  useEffect(() => {
    console.log(localStorage.getItem('user'));
    store.auth.loadUserFromStorage();
  }, []);

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
});

export default App;
