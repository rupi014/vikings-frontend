import React from 'react';
import './styles/miembro-equipo.css';

const MiembroEquipo = ({ name, image, twitter, bio }) => {
  return (
    <div className="miembro-equipo">
      <div className="miembro-equipo-imagen">
        <img src={image} alt={name} />
      </div>
      <p className="miembro-equipo-nombre">{name}</p>
      <p className="miembro-equipo-bio">{bio}</p>
      <a href={twitter} target="_blank" rel="noopener noreferrer" >
      {twitter}
      </a>
    </div>
  );
};

export default MiembroEquipo;
