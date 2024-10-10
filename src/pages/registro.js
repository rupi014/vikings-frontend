import React, { useState } from 'react';
import axios from 'axios';
import './page-styles/registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    repeatPassword: '',
    telephone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funcion para registrar el usuario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Funcion para verificar si las contraseñas coinciden
    if (formData.password !== formData.repeatPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    try {
      await axios.post('https://vikingsdb.up.railway.app/register', {
        ...formData,
        role: 'user'
      });
      alert('Usuario registrado con éxito');
      window.location.href = '/login';
    } catch (error) {
      console.error('Error al registrar usuario', error);
      alert('Hubo un error al registrar el usuario');
    }
  };

  return (
    <div className="registro-container">
      <form className="registro-form" onSubmit={handleSubmit}>
        <h2>Registro</h2>
        <label>Usuario:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="name"
          placeholder="Nombre de usuario"
        />
        <label>Contraseña:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
          placeholder="Contraseña"
        />
        <label>Repetir Contraseña:</label>
        <input
          type="password"
          name="repeatPassword"
          value={formData.repeatPassword}
          onChange={handleChange}
          required
          autoComplete="new-password"
          placeholder="Repetir Contraseña"
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
          placeholder="Email"
        />
        <label>Teléfono:</label>
        <input
          type="text"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          required
          autoComplete="tel"
          placeholder="Teléfono"
        />
        <label>Dirección:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          autoComplete="street-address"
          placeholder="Dirección"
        />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;