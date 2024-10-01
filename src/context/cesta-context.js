import React, { createContext, useState } from 'react';

export const CestaContext = createContext();

export const CestaProvider = ({ children }) => {
  const [cesta, setCesta] = useState([]);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const addToCesta = (producto, cantidad) => {
    setCesta((prevCesta) => {
      const existingProduct = prevCesta.find(item => item.id === producto.id);
      if (existingProduct) {
        return prevCesta.map(item =>
          item.id === producto.id ? { ...item, cantidad: item.cantidad + cantidad } : item
        );
      } else {
        return [...prevCesta, { ...producto, cantidad }];
      }
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