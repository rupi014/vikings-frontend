import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CestaContext } from '../context/cesta-context';
import './page-styles/producto-detalles.css';

const ProductoDetalles = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [talla, setTalla] = useState('S');
  const [cantidad, setCantidad] = useState(1);
  const { addToCesta } = useContext(CestaContext);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://vikingsdb.up.railway.app/products/${id}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducto();
  }, [id]);

  const handleAgregarAlCarrito = () => {
    const productoConDetalles = {
      ...producto,
      cantidad: parseInt(cantidad, 10) || 1,
    };

    if (producto.product_size !== "Talla Unica") {
      productoConDetalles.talla = talla;
    }

    addToCesta(productoConDetalles);
    console.log('Producto agregado al carrito:', productoConDetalles);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="producto-detalles-page">
      <div className="producto-detalles-container">
        <div className="producto-detalles-izquierda">
          <img src={producto.image} alt={producto.name} className="producto-detalles-imagen" />
          <p className="producto-detalles-descripcion">{producto.description}</p>
        </div>
        <div className="producto-detalles-derecha">
          <h2 className="producto-detalles-nombre">{producto.name}</h2>
          <p className="producto-detalles-precio">{producto.price.toFixed(2)} €</p>
          <div className="producto-detalles-opciones">
            {producto.product_size !== "Talla Unica" && (
              <label>
                Tamaño:
                <select value={talla} onChange={(e) => setTalla(e.target.value)}>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="3XL">3XL</option>
                  <option value="4XL">4XL</option>
                </select>
              </label>
            )}
            <label>
              Cantidad:
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value, 10) || 1)}
              />
            </label>
          </div>
          <button className="producto-detalles-boton" onClick={handleAgregarAlCarrito}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductoDetalles;