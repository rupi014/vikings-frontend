import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CestaContext } from '../context/cesta-context';
import '../components/styles/cesta.css';

const Cesta = () => {
    const { cesta, removeFromCesta, vaciarCesta, isAuthenticated, userInfo } = useContext(CestaContext);
    const navigate = useNavigate();

    const handleRealizarPedido = async () => {
        if (!isAuthenticated()) {
            navigate('/login');
        } else if (!userInfo) {
            alert('No se pudo obtener la información del usuario. Por favor, intente nuevamente.');
        } else {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('No se encontró el token de autenticación');
                }

                // Calcular el total_price
                const total_price = cesta.reduce((total, producto) => total + producto.price * producto.cantidad, 0);

                // Crear el pedido
                const orderResponse = await axios.post('https://vikingsdb.up.railway.app/orders/', {
                    user_id: userInfo.id, // Utilizar el user_id del contexto
                    order_date: new Date().toISOString(),
                    total_price: total_price,
                    status: 'procesando'
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const orderId = orderResponse.data.id;

                // Añadir los artículos al pedido
                for (const producto of cesta) {
                    await axios.post('https://vikingsdb.up.railway.app/products_order/', {
                        product_id: producto.id,
                        order_id: orderId,
                        quantity: producto.cantidad,
                        price: producto.price,
                        total: producto.price * producto.cantidad,
                        order_size: producto.talla || "Talla Única"
                    }, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }

                console.log('Pedido realizado');
                vaciarCesta(); // Vaciar la cesta
                navigate('/perfil'); // Redirigir a la página de perfil
            } catch (error) {
                console.error('Error al realizar el pedido:', error);
                alert('Hubo un error al realizar el pedido.');
            }
        }
    };

    return (
        <div className="cesta-container">
            <h1>Tu Cesta</h1>
            {cesta.length === 0 ? (
                <p>No hay productos en la cesta.</p>
            ) : (
                <div className="productos-cesta">
                    {cesta.map((producto, index) => (
                        <div key={index} className="producto-cesta">
                            <img src={producto.image} alt={producto.name} className="producto-cesta-imagen" />
                            <h2 className="producto-cesta-nombre">{producto.name}</h2>
                            <p className="producto-cesta-precio">{producto.price.toFixed(2)} €</p>
                            <p className="producto-cesta-talla">Talla: {producto.talla || "Talla Única"}</p>
                            <p className="producto-cesta-cantidad">Cantidad: {producto.cantidad}</p>
                            <button className="producto-cesta-boton" onClick={() => removeFromCesta(producto.id)}>Eliminar</button>
                        </div>
                    ))}
                    <button className="realizar-pedido-boton" onClick={handleRealizarPedido}>Realizar Pedido</button>
                </div>
            )}
        </div>
    );
};

export default Cesta;