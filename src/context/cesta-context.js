import React, { createContext, useState, useEffect } from 'react';

export const CestaContext = createContext();

export const CestaProvider = ({ children }) => {
  const [cesta, setCesta] = useState([]);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

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

  const removeFromCesta = (productoId) => {
    setCesta((prevCesta) => prevCesta.filter(producto => producto.id !== productoId));
  };

  const updateCantidad = (productoId, cantidad) => {
    setCesta((prevCesta) =>
      prevCesta.map(item =>
        item.id === productoId ? { ...item, cantidad } : item
      )
    );
  };

  const vaciarCesta = () => {
    setCesta([]);
  };

  const getCestaCount = () => {
    return cesta.reduce((total, producto) => total + producto.cantidad, 0);
  };

  const isAuthenticated = () => {
    return user !== null;
  };

  return (
    <CestaContext.Provider value={{ cesta, addToCesta, removeFromCesta, updateCantidad, vaciarCesta, getCestaCount, user, setUser, userInfo, setUserInfo, isAuthenticated }}>
      {children}
    </CestaContext.Provider>
  );
};