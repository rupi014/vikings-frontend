import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiembroEquipo from '../components/miembro-equipo';
import './page-styles/seccion-contenido.css';

const SeccionContenido = () => {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    axios.get('https://vikingsdb.up.railway.app/staff/')
      .then(response => setMiembros(response.data))
      .catch(error => console.error('Error al obtener los datos de la sección de contenido:', error));
  }, []);

  return (
    <div className="seccion-contenido-container">
      <h1>Sección de Contenido</h1>
      <div className="seccion-contenido-grid">
        {miembros
          .filter(miembro => miembro.role.toLowerCase() === 'sección de contenido')
          .map(miembro => (
            <MiembroEquipo key={miembro.id} name={miembro.name} image={miembro.image} />
          ))}
      </div>
    </div>
  );
};

export default SeccionContenido;
