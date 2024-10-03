import React, { useEffect, useState } from 'react';
import './page-styles/pago.css';

const Pago = () => {
  const [cesta, setCesta] = useState([]);

  useEffect(() => {
    const storedCesta = JSON.parse(localStorage.getItem('lastOrder'));
    if (storedCesta) {
      setCesta(storedCesta);
    }
  }, []);

  return (
    <div className="pago-page">
        <div className="pago-container">
        <h1>Resumen del Pedido</h1>
        <div className="resumen-pedido">
            {cesta.length > 0 ? (
            cesta.map((producto, index) => (
                <div key={index} className="producto-resumen">
                <img src={producto.image} alt={producto.name} className="producto-resumen-imagen" />
                <h2 className="producto-resumen-nombre">{producto.name}</h2>
                <p className="producto-resumen-precio">{producto.price.toFixed(2)} €</p>
                <p className="producto-resumen-talla">Talla: {producto.talla || "Talla Única"}</p>
                <p className="producto-resumen-cantidad">Cantidad: {producto.cantidad}</p>
                </div>
            ))
            ) : (
            <p>No hay productos en el pedido.</p>
            )}
        </div>
        <button className="pagar-boton">Pagar</button>
        </div>
    </div>
  );
};

export default Pago;