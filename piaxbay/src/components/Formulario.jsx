import React, {useState} from 'react';
import Error from "./Error";

const Formulario = ({updateBusqueda}) => {
  const [consulta, updateConsulta] = useState('');
  const [error, updateError] = useState(false);

  const buscarImagen = e => {
    e.preventDefault();

    updateError(false);

    if (consulta.trim() === '') {
      updateError(true);
      return;
    }

    updateBusqueda(consulta);
  }

  return (
    <form
      onSubmit={buscarImagen}
    >
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: futbol o café"
            onChange={e => updateConsulta(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <button
            type="submit"
            className="btn btn-lg btn-danger btn-block"
          >Buscar Imagenes
          </button>
        </div>
      </div>
      {error && <Error error="La consulta no puede ser en blanco" /> }
    </form>
  );
};

export default Formulario;