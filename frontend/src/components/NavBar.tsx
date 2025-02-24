import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface NavBarProps {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav>
      {isAuthenticated ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <button onClick={() => navigate('/login')}>Login</button> |{' '}
          <button onClick={() => navigate('/register')}>Register</button>
        </>
      )}
    </nav>
  );
};

export default NavBar;
