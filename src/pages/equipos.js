import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiembroEquipo from '../components/miembro-equipo';
import './page-styles/equipos.css';

const Equipos = () => { 
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    axios.get('https://vikingsdb.up.railway.app/players/')
      .then(response => setMiembros(response.data))
      .catch(error => console.error('Error al obtener los datos de los equipos:', error));
  }, []);

  return (
    <div className="equipos-container">
      <h1>Equipos</h1>
      <div className="equipos-grid">
        {miembros.length > 0 ? (
          miembros.map(miembro => (
            <MiembroEquipo key={miembro.id} name={miembro.name} image={miembro.image} />
          ))
        ) : (
          <p>PROXIMAMENTE</p>
        )}
      </div>
    </div>
  );
};

export default Equipos;
