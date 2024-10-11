import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { CestaContext } from '../context/cesta-context';
import './page-styles/producto-detalles.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const ProductoDetalles = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [talla, setTalla] = useState('S');
  const [cantidad, setCantidad] = useState(1);
  const { addToCesta } = useContext(CestaContext);
  const [botonTexto, setBotonTexto] = useState('Agregar al carrito');
  const [mostrarModal, setMostrarModal] = useState(false); 
  const navigate = useNavigate(); 

  // Funcion para obtener los datos del producto
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch(`https://vikingsdb.up.railway.app/products/${id}`);
        if (!response.ok) {
          throw new Error('Producto no encontrado');
        }
        const data = await response.json();
        setProducto(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProducto();
  }, [id]);

  // Funcion para agregar el producto al carrito
  const handleAgregarAlCarrito = () => {
    const productoConDetalles = {
      ...producto,
      cantidad: parseInt(cantidad, 10) || 1,
    };

    if (producto.product_size !== "Talla Unica") {
      productoConDetalles.talla = talla;
    }

    addToCesta(productoConDetalles);
    setBotonTexto('✅ Producto Añadido');
    setMostrarModal(true); // Muestra el modal después de agregar al carrito
    console.log('Producto agregado al carrito');
  };

  // Funcion para seguir comprando
  const handleSeguirComprando = () => {
    setMostrarModal(false);
    navigate('/tienda'); 
  };

  // Funcion para ir a la cesta
  const handleIrACesta = () => {
    setMostrarModal(false);
    navigate('/cesta'); 
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!producto) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="producto-detalles-page">
      <div className={`producto-detalles-container ${mostrarModal ? 'blur' : ''}`}>
        <div className="producto-detalles-izquierda">
          <img src={producto.image} alt={producto.name} className="producto-detalles-imagen" />
          <p className="producto-detalles-descripcion">{producto.description}</p>
        </div>
        <div className="producto-detalles-derecha">
          <h2 className="producto-detalles-nombre">{producto.name}</h2>
          <p className="producto-detalles-precio">{producto.price.toFixed(2)} €</p>
          <div className="producto-detalles-opciones">
            {producto.product_size !== "Talla Unica" && (
              <label>
                Tamaño:
                <select value={talla} onChange={(e) => setTalla(e.target.value)}>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  <option value="3XL">3XL</option>
                  <option value="4XL">4XL</option>
                </select>
              </label>
            )}
            <label>
              Cantidad:
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
              />
            </label>
          </div>
          <button className="producto-detalles-boton" onClick={handleAgregarAlCarrito}>
            {botonTexto}
          </button>
        </div>
      </div>
      <Modal
        isOpen={mostrarModal}
        onRequestClose={() => setMostrarModal(false)}
        contentLabel="Producto Añadido"
        className="modal-producto-detalles"
        overlayClassName="modal-overlay-producto-detalles"
      >
        <div className="modal-contenido">
          <p>Producto añadido al carrito</p>
          <button className="modal-boton" onClick={handleSeguirComprando}>Seguir comprando</button>
          <button className="modal-boton" onClick={handleIrACesta}>Ir a la cesta</button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductoDetalles;