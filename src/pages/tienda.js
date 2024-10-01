import React, { useEffect, useState } from 'react';
import Producto from '../components/producto';
import TiendaBanner from '../assets/images/fondos/tienda-imagen.png';
import './page-styles/tienda.css';

const Tienda = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch('https://vikingsdb.up.railway.app/products/')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="tienda-container">
      <div className="filtros">
        <h2>Explorar por</h2>
        <a href="/tienda">Todos los productos</a>
        <a href="/tienda/ropa">Ropa</a>
        <a href="/tienda/accesorios">Accesorios</a>
      </div>
      <div className="productos-container">
        <img src={TiendaBanner} alt="Tienda" /> 
        <div className="productos">
          {productos.map(producto => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tienda;