import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useLocation } from 'react-router-dom'; // Importar useLocation
import './page-styles/pago.css';
import axios from 'axios'; // Asegúrate de importar axios

const Pago = () => {
  const location = useLocation();
  const { orderData } = location.state || {}; // Obtener los datos de la orden
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
            <p>Total: {totalAmount.toFixed(2)} €</p>
        </div>
        <PayPalScriptProvider 
            options={{ 
                "client-id": "AfvD3MxmCdNpIpy7v5TXHE1mWbYUSHf0uvV_E7OkGBVzWht18ymA5cwXx1CCoYGr2uR2_tvjothHBUQU",
                currency: "EUR",
                intent: "capture",
            }}>

          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    value: totalAmount.toFixed(2),
                    currency_code: 'EUR'
                  }
                }]
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then(details => {
                if (orderData) {
                  const updatedOrderData = {
                    ...orderData,
                    status: "pagado"
                  };

                  // Realizar la petición PUT con axios
                  axios.put(`https://vikingsdb.up.railway.app/orders/${orderData.id}`, updatedOrderData, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${localStorage.getItem('token')}` // Añadir el token de autenticación
                    }
                  })
                  .then(response => {
                    console.log('Orden actualizada:', response.data);
                    alert(`Pedido pagado por ${details.payer.name.given_name}`);
                    window.location.href = '/perfil';
                  })
                  .catch(error => {
                    console.error('Error al actualizar la orden:', error);
                    alert('Hubo un error al actualizar la orden.');
                  });
                } else {
                  console.error('No se encontraron datos de la orden.');
                }
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