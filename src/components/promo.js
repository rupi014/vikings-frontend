import React from 'react';
import '../components/styles/promo.css';
import { Link } from 'react-router-dom';
import Persona from '../assets/images/home_images/persona3.webp';
import Camiseta from '../assets/images/home_images/camiseta.webp';

const Promo = () => {
  return (
    <div className="promo">
      <img src={Persona} alt="Persona" className="promo-persona" />
      <div className="promo-content">
        <h1>¡LA ESPERA TERMINÓ!</h1>
        <p>NUESTRA NUEVA EQUIPACIÓN YA ESTÁ DISPONIBLE. SÉ EL PRIMERO EN LUCIR Y RENDIR AL MÁXIMO.</p>
        <Link to="/tienda" className="promo-button">¡CONSIGUE LA TUYA AHORA!</Link>
      </div>
      <img src={Camiseta} alt="Camiseta" className="promo-camiseta" />
    </div>
  );
};

export default Promo;