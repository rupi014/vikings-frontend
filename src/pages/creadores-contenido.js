import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiembroEquipo from '../components/miembro-equipo';
import './page-styles/creadores-contenido.css';

const CreadoresContenido = () => {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    axios.get('https://vikingsdb.up.railway.app/staff/')
      .then(response => setMiembros(response.data))
      .catch(error => console.error('Error al obtener los datos de los creadores de contenido:', error));
  }, []);

  return (
    <div className="creadores-contenido-container">
      <h1>Creadores de Contenido</h1>
      <div className="creadores-contenido-grid">
        {miembros
          .filter(miembro => miembro.role.toLowerCase() === 'creador de contenido')
          .map(miembro => (
            <MiembroEquipo key={miembro.id} name={miembro.name} image={miembro.image} bio={miembro.bio} twitter={miembro.twitter} />
          ))}
      </div>
    </div>
  );
};

export default CreadoresContenido;
