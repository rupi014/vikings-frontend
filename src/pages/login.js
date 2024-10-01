import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CestaContext } from '../context/cesta-context';
import './page-styles/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(CestaContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);

      const response = await axios.post('https://vikingsdb.up.railway.app/token', params);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('userName', username);
      setUser(username);
      console.log('Inicio de sesión exitoso');
      navigate('/', { state: { isLoggedIn: true } });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setErrorMessage('Usuario o contraseña incorrecto'); // Error de autenticación
        } else {
          setErrorMessage('No fue posible conectar al servidor'); // Otro error del servidor
        }
      } else {
        setErrorMessage('No fue posible conectar al servidor'); // Error de red u otro problema
      }
      console.error('Error al iniciar sesión', error.response ? error.response.data : error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Inicio de Sesión</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <label htmlFor="username">Usuario:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </div>
  );
};

export default Login;