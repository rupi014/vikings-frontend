import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import './page-styles/contact.css';
import contactImage from '../assets/images/fondos/contact-image.png';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funcion para enviar el mensaje con emailjs
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form.current,
      process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((result) => {
        console.log(result.text);
        alert('Mensaje enviado con éxito');
        setFormData({ user_name: '', user_email: '', subject: '', message: '' });
    }, (error) => {
        console.log(error.text);
        alert('Hubo un error al enviar el mensaje');
    });
  };

  return (
    <div className="contact-container">
      <div className="contact-form">
        <h1>Contactanos</h1>
        <form ref={form} onSubmit={sendEmail}>
          <div className="form-group">
            <input
              type="text"
              name="user_name"
              placeholder="Nombre"
              value={formData.user_name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="user_email"
              placeholder="Email"
              value={formData.user_email}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="text"
            name="subject"
            placeholder="Asunto"
            value={formData.subject}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Escribe tu mensaje aquí..."
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
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
