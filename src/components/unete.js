import React from 'react';
import { Link } from 'react-router-dom';
import './styles/unete.css';
import Image from '../assets/images/home_images/contactoimagen.webp';

const Unete = () => {
  return (
    <div className="join-us-container">
      <div className="content-joinus">
        <h2>¿Quieres formar parte de la familia Vikinga?</h2>
        <p>¡Lo tienes muy fácil!</p>
        <Link to="/contact" className="unete-button">¡UNETE!</Link>
      </div>
      <div className="img-joinus">
        <img src={Image} alt="Imagen Contacto" />
      </div>
      
    </div>
  );
};

export default Unete;