import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CestaProvider } from './context/cesta-context.js'; 
import Header from './components/header';
import Home from './pages/home';
import Equipos from './pages/equipos';
import EquipoTecnico from './pages/equipo-tecnico';
import Casters from './pages/casters';
import CreadoresContenido from './pages/creadores-contenido';
import SeccionContenido from './pages/seccion-contenido';
import Directiva from './pages/directiva';
import Contact from './pages/contact';
import Tienda from './pages/tienda';
import Footer from './components/footer';
import Cesta from './components/cesta';
import Login from './pages/login';
import Perfil from './pages/perfil';
import ProductoDetalles from './pages/producto-detalles';
import Pago from './pages/pago';
import Blogs from './pages/blog';
import BlogDetalles from './components/blog_detalles';  
import Registro from './pages/registro';
import './App.css';

function App() {
  return (
    <Router>
      <CestaProvider>
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
          <Route path="/blog" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/cesta" element={<Cesta />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/producto/:id" element={<ProductoDetalles />} />
          <Route path="/pago" element={<Pago />} />
          <Route path="/blog/:id" element={<BlogDetalles />} />
          <Route path="/registro" element={<Registro />} />
        </Routes>
        <Footer />
      </div>
      </CestaProvider>
    </Router>
  );
}

export default App;
