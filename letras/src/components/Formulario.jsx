import React, {useState} from 'react';

const Formulario = ({updateBusquedaLetra}) => {
  const [busqueda, updateBusqueda] = useState({
    artista: '',
    cancion: ''
  });

  const [ error, updateError ] = useState(false);

  const {artista, cancion} = busqueda;

  const actualizarState = e => {
    updateBusqueda({
      ...busqueda,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    if(cancion.trim() === '' || artista.trim() === ''){
      updateError(true);
      return;
    }

    updateError(false);
    updateBusquedaLetra(busqueda);
  }

  return (
    <div className="bg-info">
      <div className="container">
        {error && <p className="alert alert-danger p-3 text-center">Todos los campos son obligatorios!</p> }
        <div className="row">
          <form
            className="col card text-white bg-transparent mb-5 pt-5 pb-2"
            onSubmit={handleSubmit}
          >
            <fieldset>
              <legend className="text-center ">Buscador Letras Canciones</legend>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artista</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artista"
                      placeholder="Nombre Artista"
                      onChange={actualizarState}
                      value={artista}
                    />
                  </div>

                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Canción</label>
                    <input
                      type="text"
                      className="form-control"
                      name="cancion"
                      placeholder="Nombre Canción"
                      onChange={actualizarState}
                      value={cancion}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary float-right"
              >Buscar
              </button>
            </fieldset>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Formulario;