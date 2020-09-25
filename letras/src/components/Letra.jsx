import React, {Fragment} from 'react';

const Letra = ({infoLetra}) => {
  if (infoLetra.length === 0)
    return null;

  return (
    <Fragment>
      <h2>Letra Canción</h2>
      <p className="letra">{infoLetra}</p>
    </Fragment>
  );
};

export default Letra;