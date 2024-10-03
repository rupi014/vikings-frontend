import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/producto.css';

const Producto = ({ producto }) => {
  const navigate = useNavigate();

  const handleVerProducto = () => {
    navigate(`/producto/${producto.id}`);
  };

  return (
    <div className="producto">
      <img src={producto.image} alt={producto.name} className="producto-imagen" />
      <h2 className="producto-nombre">{producto.name}</h2>
      <p className="producto-precio">{producto.price.toFixed(2)} €</p>
      <button className="producto-boton" onClick={handleVerProducto}>Ver producto</button>
    </div>
  );
};

export default Producto;