import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CestaContext } from '../context/cesta-context.js';
import './styles/header.css';
import HeaderLogo from '../assets/images/logos/header-logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getCestaCount, user } = useContext(CestaContext);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <img src={HeaderLogo} alt="Logo" />
      </div>
      <nav className={`nav ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>INICIO</Link></li>
          <li className="dropdown">
            <Link to="/equipos" onClick={closeMenu}>VIKINGS</Link>
            <div className="dropdown-content">
              <Link to="/equipos" onClick={closeMenu}>EQUIPOS</Link>
              <Link to="/equipo-tecnico" onClick={closeMenu}>EQUIPO TECNICO</Link>
              <Link to="/casters" onClick={closeMenu}>CASTERS</Link>
              <Link to="/creadores-de-contenido" onClick={closeMenu}>CREADORES DE CONTENIDO</Link>
              <Link to="/seccion-de-contenido" onClick={closeMenu}>SECCIÓN DE CONTENIDO</Link>
              <Link to="/directiva" onClick={closeMenu}>DIRECTIVA</Link>
            </div>
          </li>
          <li><Link to="/blog" onClick={closeMenu}>BLOG</Link></li>
          <li><Link to="/contact" onClick={closeMenu}>CONTACTO</Link></li>
          <li><Link to="/tienda" onClick={closeMenu}>TIENDA</Link></li>
        </ul>
      </nav>
      <div className="user-actions">
        {user ? (
          <span className="user-greeting" onClick={() => navigate('/perfil')}>Hola {user}</span>
        ) : (
          <Link to="/login" className="login">Log In</Link>
        )}
        <Link to="/cesta" className="cart">
          <span className="cart-icon">🛒</span>
          <span className="cart-count">{getCestaCount()}</span>
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      </div>
    </header>
  );
};

export default Header;