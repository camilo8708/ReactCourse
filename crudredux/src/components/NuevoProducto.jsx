import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//Actions de redux
import { crearNuevoProductoAcition } from "../actions/productoActions";
import { mostrarAlerta, ocultarAlerta } from "../actions/alertaAction";

const NuevoProducto = ({ history }) => {
  //State del componente
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0);

  //Utilizar el dispatch para crear una función
  const dispatch = useDispatch();

  //Obtenemos los campos del Store
  const cargando = useSelector((state) => state.productos.loading);
  const error = useSelector((state) => state.productos.error);
  const alerta = useSelector((state) => state.alerta.alerta);

  const handlerSubmit = (e) => {
    e.preventDefault();
    //Validamos
    if (nombre.trim() === "" || precio <= 0) {
      const alerta = {
        msg: "Todos los campos son obligatorios",
        class: "alert alert-danger text-center uppercase p-3",
      };
      dispatch(mostrarAlerta(alerta));
      return;
    }

    dispatch(ocultarAlerta());

    //Crear el nuevo producto
    dispatch(crearNuevoProductoAcition({ nombre, precio }));

    //Redireccionar al home
    history.push("/");
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card">
          <div className="card-body">
            <h2 className="text-center mb-4 font-weight-bold">
              Agregar Nuevo Producto
            </h2>

            {alerta && <p className={alerta.class}>{alerta.msg}</p>}

            <form onSubmit={handlerSubmit}>
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  className="form-control"
                  type="text"
                  name="nombre"
                  placeholder="Nombre Producto"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Precio Producto</label>
                <input
                  className="form-control"
                  type="number"
                  name="precio"
                  placeholder="Precio Producto"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block text-uppercase"
              >
                {!cargando ? (
                  "Agregar"
                ) : (
                  <div className="spinner-border text-light" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </form>
            {error && (
              <p className="alert alert-danger p-2 mt-4 text-center">
                Hubo un error
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevoProducto;
