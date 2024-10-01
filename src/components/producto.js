import React, { useContext, useState } from 'react';
import { CestaContext } from '../context/cesta-context.js';
import './styles/producto.css';

const Producto = ({ producto }) => {
    const { cesta, addToCesta, removeFromCesta } = useContext(CestaContext);
    const [cantidad, setCantidad] = useState(1);
  
    const handleAddToCart = () => {
      addToCesta(producto, cantidad);
    };
  
    const handleRemoveFromCart = () => {
      removeFromCesta(producto.id);
    };
  
    const isInCesta = cesta.some(item => item.id === producto.id);
  
    return (
      <div className="producto">
        <img src={producto.image} alt={producto.name} className="producto-imagen" />
        <h2 className="producto-nombre">{producto.name}</h2>
        <p className="producto-precio">{producto.price.toFixed(2)} €</p>
        <input
          type="number"
          min="1"
          value={cantidad}
          onChange={(e) => setCantidad(parseInt(e.target.value))}
          className="producto-cantidad"
        />
        {isInCesta ? (
          <button className="producto-boton" onClick={handleRemoveFromCart}>Eliminar de la cesta</button>
        ) : (
          <button className="producto-boton" onClick={handleAddToCart}>Añadir a la cesta</button>
        )}
      </div>
    );
  };
  
  export default Producto;