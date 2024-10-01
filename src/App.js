import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Home from './pages/home';
import Equipos from './pages/equipos';
import EquipoTecnico from './pages/equipo-tecnico';
import Casters from './pages/casters';
import CreadoresContenido from './pages/creadores-contenido';
import SeccionContenido from './pages/seccion-contenido';
import Directiva from './pages/directiva';
import Blog from './pages/blog';
import Contact from './pages/contact';
import Tienda from './pages/tienda';
import Footer from './components/footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/equipo-tecnico" element={<EquipoTecnico />} />
          <Route path="/casters" element={<Casters />} />
          <Route path="/creadores-de-contenido" element={<CreadoresContenido />} />
          <Route path="/seccion-de-contenido" element={<SeccionContenido />} />
          <Route path="/directiva" element={<Directiva />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tienda" element={<Tienda />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
