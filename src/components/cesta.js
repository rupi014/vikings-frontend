import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CestaContext } from '../context/cesta-context';
import '../components/styles/cesta.css';

const Cesta = () => {
    const { cesta, updateCantidad, removeFromCesta, vaciarCesta, isAuthenticated, userInfo } = useContext(CestaContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleCantidadChange = (productoId, nuevaCantidad) => {
        updateCantidad(productoId, nuevaCantidad);
    };

    // Se crea la funcion para realizar el pedido
    const handleRealizarPedido = async () => {
        if (!isAuthenticated()) {
            navigate('/login');
        } else if (!userInfo) {
            alert('No se pudo obtener la información del usuario. Por favor, intente nuevamente.');
        } else {
            try {
                setLoading(true);
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

                // Guardar los datos del pedido
                const orderData = {
                    id: orderId,
                    user_id: userInfo.id,
                    order_date: orderResponse.data.order_date,
                    total_price: total_price,
                    status: 'procesando'
                };

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
                localStorage.setItem('lastOrder', JSON.stringify(cesta));
                vaciarCesta(); // Vaciar la cesta

                // Redirigir a la página de pago con los datos del pedido
                navigate('/pago', { state: { orderData } });
            } catch (error) {
                console.error('Error al realizar el pedido:', error);
                alert('Hubo un error al realizar el pedido.');
            } finally {
                setLoading(false);
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
                            <input
                                type="number"
                                min="1"
                                value={producto.cantidad}
                                onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value))}
                                className="producto-cesta-cantidad-input"
                            />
                            <button className="producto-cesta-boton" onClick={() => removeFromCesta(producto.id)}>Eliminar</button>
                        </div>
                    ))}
                </div>
            )}
            <div className="boton-container">
                <button className="realizar-pedido-boton" onClick={handleRealizarPedido} disabled={loading}>
                    {loading ? 'Realizando Pedido' : 'Realizar Pedido'}
                </button>
            </div>
        </div>
    );
};

export default Cesta;