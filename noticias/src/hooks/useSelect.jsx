import React, {useState} from 'react';
import PropTypes from 'prop-types';

const useSelect = (stateInicial, opciones) => {
  const [categoria, updateCategoria] = useState(stateInicial);

  const SelectNoticias = () => (
    <select className="custom-select d-block"
            value={categoria}
            onChange={e => (updateCategoria(e.target.value))}
    >
      {opciones.map(opcion => (
        <option key={opcion.value} value={opcion.value}>{opcion.label}</option>
      ))}
    </select>
  )

  return [categoria, SelectNoticias];
};

useSelect.PropTypes = {
  stateInicial: PropTypes.string.isRequired,
  opciones: PropTypes.array.isRequired
}

export default useSelect;