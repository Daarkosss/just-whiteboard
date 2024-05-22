import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLeave = () => {
    navigate('/');
  };

  return (
    <div className="header">
      <div>Whiteboard</div>
      <Button variant="danger" onClick={handleLeave}>Leave</Button>
    </div>
  );
};

export default Header;
