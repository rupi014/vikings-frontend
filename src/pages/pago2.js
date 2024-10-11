import React, { useEffect, useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './page-styles/pago.css';

const Pago2 = () => {
  const location = useLocation();
  const { products, orderId } = location.state || {};
  const [detailedProducts, setDetailedProducts] = useState([]);

  // Recuperar los detalles de los productos
  useEffect(() => {
    const fetchProductDetails = async (product) => {
      try {
        const response = await axios.get(`https://vikingsdb.up.railway.app/products/${product.product_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        return { 
          ...product, 
          name: response.data.name, 
          image: response.data.image,
          price: response.data.price,
          talla: response.data.order_size,
          quantity: product.quantity,
        };
      } catch (error) {
        console.error('Error fetching product details:', error);
        return product;
      }
    };

    // Cargar los detalles de los productos
    const loadProducts = async () => {
      if (products) {
        const detailedProducts = await Promise.all(products.map(fetchProductDetails));
        setDetailedProducts(detailedProducts);
      }
    };

    loadProducts();
  }, [products]);

  // Calcular el total del pedido
  const totalAmount = detailedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

  // Función para obtener el total del pedido en formato de cadena
  const getOrderAmount = () => {
    return totalAmount.toFixed(2);
  };

  return (
    <div className="pago-page">
      <div className="pago-container">
        <h1>Pagar Pedido {orderId}</h1>
        <div className="resumen-pedido">
          {detailedProducts.length > 0 ? (
            detailedProducts.map((product, index) => (
              <div key={index} className="producto-resumen">
                <img src={product.image} alt={product.name} className="producto-resumen-imagen" />
                <h2 className="producto-resumen-nombre">{product.name}</h2>
                <p className="producto-resumen-precio">{product.price.toFixed(2)} €</p>
                <p className="producto-resumen-talla">Talla: {product.order_size || "Talla Única"}</p>
                <p className="producto-resumen-cantidad">Cantidad: {product.quantity}</p>
              </div>
            ))
          ) : (
            <p>No hay productos en el pedido.</p>
          )}
        </div>
        <div className="pago-total">
          <p>Total: {totalAmount.toFixed(2)} €</p>
        </div>
          
        {totalAmount > 0 && (
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
                      value: getOrderAmount(), 
                      currency_code: 'EUR'
                    }
                  }]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order.capture().then(details => {
                  if (orderId) {
                    axios.get(`https://vikingsdb.up.railway.app/orders/${orderId}`, {
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                      }
                    })
                    .then(response => {
                      const updatedOrderData = {
                        ...response.data,
                        status: "pagado"  
                      };

                      return axios.put(`https://vikingsdb.up.railway.app/orders/${orderId}`, updatedOrderData, {
                        headers: {
                          'Content-Type': 'application/json',
                          'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                      });
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
        )}
      </div>
    </div>
  );
};

export default Pago2;