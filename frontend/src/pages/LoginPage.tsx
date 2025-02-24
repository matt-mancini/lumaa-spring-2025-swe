import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

interface LoginPageProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', response.data.token);

      // Set state to true so NavBar updates
      setIsAuthenticated(true);

      navigate('/tasks');
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };


  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
