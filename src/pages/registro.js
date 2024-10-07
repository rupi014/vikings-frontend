import React, { useState } from 'react';
import axios from 'axios';
import './page-styles/registro.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    telephone: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        <label>Contraseña:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Teléfono:</label>
        <input type="text" name="telephone" value={formData.telephone} onChange={handleChange} required />
        <label>Dirección:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default Registro;