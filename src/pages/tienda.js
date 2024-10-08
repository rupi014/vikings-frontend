import React, { useEffect, useState } from 'react';
import Producto from '../components/producto';
import TiendaBanner from '../assets/images/fondos/tienda-imagen.png';
import './page-styles/tienda.css';

const Tienda = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');

  useEffect(() => {
    fetch('https://vikingsdb.up.railway.app/products/')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const filtrarProductos = () => {
    if (categoriaSeleccionada === 'todos') {
      return productos;
    } else if (categoriaSeleccionada === 'ropa') {
      return productos.filter(producto => producto.category === 'ropa');
    } else if (categoriaSeleccionada === 'accesorios') {
      return productos.filter(producto => producto.category === 'accesorios');
    }
  };

  return (
    <div className="tienda-container">
      <div className="filtros">
        <h2>Explorar por</h2>
        <button className='button-filter' onClick={() => setCategoriaSeleccionada('todos')}>Todos los productos</button>
        <button className='button-filter' onClick={() => setCategoriaSeleccionada('ropa')}>Ropa</button>
        <button className='button-filter' onClick={() => setCategoriaSeleccionada('accesorios')}>Accesorios</button>
      </div>
      <div className="productos-container">
        <img className='tienda-banner-img' src={TiendaBanner} alt="Tienda" /> 
        <div className="productos">
          {filtrarProductos().map(producto => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tienda;