import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CestaContext } from '../context/cesta-context';
import '../pages/page-styles/perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const { setUser, setUserInfo, userInfo } = useContext(CestaContext);
  const [userOrders, setUserOrders] = useState([]);
  const [orderProducts, setOrderProducts] = useState([]);
  const [productNames, setProductNames] = useState({});
  const [visibleOrderId, setVisibleOrderId] = useState(null); // Estado para controlar la visibilidad de la tabla

  // Use useCallback to memorize handleLogout
  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUser(null);
    setUserInfo(null);
    navigate('/login');
  }, [navigate, setUser, setUserInfo]);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token no encontrado');

        const response = await axios.get('https://vikingsdb.up.railway.app/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserInfo(response.data);
      } catch (error) {
        console.error('Error verifying token:', error);
        handleLogout(); // Desloguear si el token no es válido
      }
    };

    const fetchUserOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://vikingsdb.up.railway.app/orders/user/${userInfo.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserOrders(response.data);
      } catch (error) {
        console.error('Error fetching user orders:', error);
      }
    };

    if (userInfo) {
      fetchUserOrders();
    } else {
      verifyToken();
    }
  }, [setUserInfo, userInfo, handleLogout]);

  const handleViewProducts = async (orderId) => {
    if (visibleOrderId === orderId) {
      setVisibleOrderId(null); // Oculta la tabla si ya está visible
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://vikingsdb.up.railway.app/products_order/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const products = response.data;
      setOrderProducts(products);

      const productNamesTemp = {};
      for (const product of products) {
        const productResponse = await axios.get(`https://vikingsdb.up.railway.app/products/${product.product_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        productNamesTemp[product.product_id] = productResponse.data.name;
      }
      setProductNames(productNamesTemp);
      setVisibleOrderId(orderId); // Muestra la tabla para el pedido actual
    } catch (error) {
      console.error('Error fetching order products:', error);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-info">
        <h1>Perfil de {userInfo.username}</h1>
        <p><strong>Nombre:</strong> {userInfo.username}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Dirección:</strong> {userInfo.address}</p>
        <p><strong>Teléfono:</strong> {userInfo.telephone}</p>
        <button className="logout-button" onClick={handleLogout}>Cerrar Sesión</button>
      </div>
      <div className="perfil-orders">
        <h2>Pedidos Realizados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.total_price.toFixed(2)} €</td>
                <td>{order.status}</td>
                <td>
                  <button onClick={() => handleViewProducts(order.id)}>
                    {visibleOrderId === order.id ? 'Ocultar Productos' : 'Ver Productos'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleOrderId && orderProducts.length > 0 && (
          <div className="order-products">
            <h3>Productos del Pedido</h3>
            <table>
              <thead>
                <tr>
                  <th>Producto ID</th>
                  <th>Nombre</th>
                  <th>Cantidad</th>
                  <th>Talla</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {orderProducts.map(product => (
                  <tr key={product.id}>
                    <td>{product.product_id}</td>
                    <td>{productNames[product.product_id] || 'Cargando...'}</td>
                    <td>{product.quantity}</td>
                    <td>{product.order_size}</td>
                    <td>{product.price.toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;