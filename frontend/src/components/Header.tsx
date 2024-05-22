import React from 'react';
import { Button } from 'react-bootstrap';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div>Whiteboard</div>
      <Button variant="danger">Leave</Button>
    </div>
  );
};

export default Header;
