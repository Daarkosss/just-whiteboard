import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate('/');
  };

  return (
    <div className="sticky-header-full-width">
      <h1 className='title'>Whiteboard</h1>
      <Button className="leave-button" variant="danger" onClick={handleLeave}>Leave</Button>
    </div>
  );
};

export default Header;
