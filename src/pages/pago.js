import React, { useContext } from 'react';
import { CestaContext } from '../context/cesta-context';
import './page-styles/pago.css';

const Pago = () => {
  const { cesta } = useContext(CestaContext);

  return (
    <div className="pago-container">
      <h1>Resumen del Pedido</h1>
      <div className="resumen-pedido">
        {cesta.map((producto, index) => (
          <div key={index} className="producto-resumen">
            <img src={producto.image} alt={producto.name} className="producto-resumen-imagen" />
            <h2 className="producto-resumen-nombre">{producto.name}</h2>
            <p className="producto-resumen-precio">{producto.price.toFixed(2)} €</p>
            <p className="producto-resumen-talla">Talla: {producto.talla || "Talla Única"}</p>
            <p className="producto-resumen-cantidad">Cantidad: {producto.cantidad}</p>
          </div>
        ))}
      </div>
      <button className="pagar-boton">Pagar</button>
    </div>
  );
};

export default Pago;