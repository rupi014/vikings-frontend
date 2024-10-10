import React, { createContext, useState, useEffect } from 'react';

// Se crea el contexto de la cesta

export const CestaContext = createContext();

// Se crea el proveedor del contexto de la cesta  

export const CestaProvider = ({ children }) => {
  const [cesta, setCesta] = useState([]);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  // Se obtiene el usuario y la información del usuario del localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('userName');
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (storedUser) {
      setUser(storedUser);
    }
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, []);

  // Se agrega un producto a la cesta
  const addToCesta = (producto) => {
    setCesta((prevCesta) => {
      const productoExistente = prevCesta.find((p) => p.id === producto.id);
      if (productoExistente) {
        return prevCesta.map((p) =>
          p.id === producto.id ? { ...p, cantidad: p.cantidad + producto.cantidad } : p
        );
      }
      return [...prevCesta, producto];
    });
  };

  // Se elimina un producto de la cesta
  const removeFromCesta = (productoId) => {
    setCesta((prevCesta) => prevCesta.filter(producto => producto.id !== productoId));
  };

  // Se actualiza la cantidad de un producto en la cesta
  const updateCantidad = (productoId, cantidad) => {
    setCesta((prevCesta) =>
      prevCesta.map(item =>
        item.id === productoId ? { ...item, cantidad } : item
      )
    );
  };

  // Se vacía la cesta
  const vaciarCesta = () => {
    setCesta([]);
  };

  // Se obtiene la cantidad de productos en la cesta
  const getCestaCount = () => {
    return cesta.reduce((total, producto) => total + producto.cantidad, 0);
  };

  // Se verifica si el usuario está autenticado
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return token !== null && user !== null;
  };

  // Se devuelve el contexto de la cesta
  return (
    <CestaContext.Provider value={{ cesta, addToCesta, removeFromCesta, updateCantidad, vaciarCesta, getCestaCount, user, setUser, userInfo, setUserInfo, isAuthenticated }}>
      {children}
    </CestaContext.Provider>
  );
};