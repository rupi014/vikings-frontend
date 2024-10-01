import React from 'react';
import './page-styles/contact.css';
import contactImage from '../assets/images/fondos/contact-image.png';
const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-form">
        <h1>Contactanos</h1>
        <form>
          <div className="form-group">
            <input type="text" placeholder="Nombre" />
            <input type="email" placeholder="Email" />
          </div>
          <input type="text" placeholder="Asunto" />
          <textarea placeholder="Escribe tu mensaje aquí..."></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
      <div className="contact-image">
        <img src={contactImage} alt="Equipo" />
      </div>
    </div>
  );
};

export default Contact;
