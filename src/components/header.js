import React from 'react';
import { Link } from 'react-router-dom';
import './styles/header.css';
import HeaderLogo from '../assets/images/logos/header-logo.png';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={HeaderLogo} alt="Logo" />
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">INICIO</Link></li>
          <li className="dropdown">
            <Link to="/equipos">VIKINGS</Link>
            <div className="dropdown-content">
              <Link to="/equipos">EQUIPOS</Link>
              <Link to="/equipo-tecnico">EQUIPO TECNICO</Link>
              <Link to="/casters">CASTERS</Link>
              <Link to="/creadores-de-contenido">CREADORES DE CONTENIDO</Link>
              <Link to="/seccion-de-contenido">SECCIÓN DE CONTENIDO</Link>
              <Link to="/directiva">DIRECTIVA</Link>
            </div>
          </li>
          <li><Link to="/blog">BLOG</Link></li>
          <li><Link to="/contact">CONTACTO</Link></li>
          <li><Link to="/tienda">TIENDA</Link></li>
        </ul>
      </nav>
      <div className="user-actions">
        <Link to="/login" className="login">Log In</Link>
        <Link to="/cart" className="cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-count">0</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;