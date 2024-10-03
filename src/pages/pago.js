import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import './page-styles/pago.css';

const Pago = () => {
  const [cesta, setCesta] = useState([]);

  useEffect(() => {
    const storedCesta = JSON.parse(localStorage.getItem('lastOrder'));
    if (storedCesta) {
      setCesta(storedCesta);
    }
  }, []);

  // Calcular el total del pedido
  const totalAmount = cesta.reduce((total, producto) => total + producto.price * producto.cantidad, 0);

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
        <div className="pago-total">
            <p>Total: {totalAmount} €</p>
        </div>
        <PayPalScriptProvider 
            options={{ 
                "client-id": "AfvD3MxmCdNpIpy7v5TXHE1mWbYUSHf0uvV_E7OkGBVzWht18ymA5cwXx1CCoYGr2uR2_tvjothHBUQU",
                currency: "EUR", // Asegúrate de que la moneda esté configurada aquí
                intent: "capture",
            }}>

          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: totalAmount.toFixed(2), // Total del pedido
                    currency_code: 'EUR'
                  }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(details => {
                alert(`Transaction completed by ${details.payer.name.given_name}`);
                // Aquí puedes manejar la lógica después de un pago exitoso
              });
            }}
            onError={(err) => {
              console.error('Error en el pago de PayPal:', err);
              alert('Hubo un error al procesar el pago.');
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Pago;