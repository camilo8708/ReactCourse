import React from "react";
import PropTypes from 'prop-types';

const Gasto = ({gasto}) => (
  <li className="gastos">
    <p>
      {gasto.nombre}
      <span className="badge badge-primary">$ {gasto.valor}</span>
    </p>
  </li>
);

Gasto.propType = {
  gasto: PropTypes.object.isRequired
}

export default Gasto;