import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiembroEquipo from '../components/miembro-equipo';
import './page-styles/directiva.css';

const Directiva = () => {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    axios.get('https://vikingsdb.up.railway.app/staff/')
      .then(response => setMiembros(response.data))
      .catch(error => console.error('Error al obtener los datos de la directiva:', error));
  }, []);

  return (
    <div className="directiva-container">
      <h1>Directiva</h1>
      <div className="directiva-grid">
        {miembros
          .filter(miembro => miembro.role.toLowerCase() === 'directiva')
          .map(miembro => (
            <MiembroEquipo key={miembro.id} name={miembro.name} image={miembro.image} twitter={miembro.twitter} bio={miembro.bio} />
          ))}
      </div>
    </div>
  );
};

export default Directiva;
