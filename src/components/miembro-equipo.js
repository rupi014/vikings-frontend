import React from 'react';
import './styles/miembro-equipo.css';

const MiembroEquipo = ({ name, image }) => {
  return (
    <div className="miembro-equipo">
      <div className="miembro-equipo-imagen">
        <img src={image} alt={name} />
      </div>
      <p className="miembro-equipo-nombre">{name}</p>
    </div>
  );
};

export default MiembroEquipo;
