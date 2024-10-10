import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiembroEquipo from '../components/miembro-equipo';
import './page-styles/equipo-tecnico.css';

const EquipoTecnico = () => {
  const [miembros, setMiembros] = useState([]);

  // Funcion para obtener los datos del equipo tecnico de la base de datos
  useEffect(() => {
    axios.get('https://vikingsdb.up.railway.app/staff/')
      .then(response => setMiembros(response.data))
      .catch(error => console.error('Error al obtener los datos del equipo técnico:', error));
  }, []);

  return (
    <div className="equipo-tecnico-container">
      <h1>Equipo Técnico</h1>
      <div className="equipo-tecnico-grid">
        {miembros
        .filter(miembro => miembro.role === 'Equipo Técnico')
        .map(miembro => (
          <MiembroEquipo key={miembro.id} name={miembro.name} image={miembro.image} twitter={miembro.twitter} bio={miembro.bio} />
        ))}
      </div>
    </div>
  );
};

export default EquipoTecnico;
