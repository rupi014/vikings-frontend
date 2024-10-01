import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CestaContext } from '../context/cesta-context';
import '../pages/page-styles/perfil.css';

const Perfil = () => {
  const navigate = useNavigate();
  const { setUser, setUserInfo, userInfo } = useContext(CestaContext);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://vikingsdb.up.railway.app/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
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
      fetchUserInfo();
    }
  }, [setUserInfo, userInfo]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUser(null);
    setUserInfo(null);
    navigate('/login');
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
            </tr>
          </thead>
          <tbody>
            {userOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.order_date).toLocaleDateString()}</td>
                <td>{order.total_price.toFixed(2)} €</td>
                <td>{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Perfil;
