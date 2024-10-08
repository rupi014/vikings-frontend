import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiembroEquipo from '../components/miembro-equipo';
import './page-styles/casters.css';

const Casters = () => {
  const [miembros, setMiembros] = useState([]);

  useEffect(() => {
    axios.get('https://vikingsdb.up.railway.app/staff/')
      .then(response => setMiembros(response.data))
      .catch(error => console.error('Error al obtener los datos de los casters:', error));
  }, []);

  return (
    <div className="casters-container">
      <h1>Casters</h1>
      <div className="casters-grid">
        {miembros
          .filter(miembro => miembro.role.toLowerCase() === 'caster')
          .map(miembro => (
            <MiembroEquipo key={miembro.id} name={miembro.name} image={miembro.image} twitter={miembro.twitter} bio={miembro.bio}   />
          ))}
      </div>
    </div>
  );
};

export default Casters;
