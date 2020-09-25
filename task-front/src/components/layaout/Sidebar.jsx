import React, { useState, useContext } from "react";
import Proyectos from "../proyectos/Proyectos";
import { ProyectoContext } from "../../context/proyectos/ProyectoContext";

const Sidebar = () => {
  //Context
  const proyectoContext = useContext(ProyectoContext);
  const { agregarProyecto } = proyectoContext;

  //States locales
  const [proyecto, setProyecto] = useState({
    id: "",
    nombre: "",
    numTareas: 0,
  });
  const [crear, setCrear] = useState(false);
  const [error, setError] = useState(false);

  //Funciones
  const crearProyecto = () => {
    //Validar que se ingrese un nombre de proyecto
    setError(false);
    if (proyecto.nombre.trim() === "") {
      setError(true);
      return;
    }

    agregarProyecto(proyecto);
    setCrear(false);
    setProyecto({ id: "", nombre: "", numTareas: 0 });
  };

  const handlerChange = (e) => {
    setProyecto({
      ...proyecto,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <nav className="jumbotron col-md-3 col-lg-3 d-md-block collapse m-0 pt-2 pb-4">
      <div className="sidebar-sticky pt-3">
        <h4 className="text-center font-weight-bold mb-5">
          MERN<small>Task</small>
        </h4>
        {!crear ? (
          <button
            className="btn btn-primary btn-block btn-sm mb-5"
            onClick={() => setCrear(true)}
          >
            Nuevo Proyecto
          </button>
        ) : (
          <div className="form-group input-group input-group-sm">
            {error && (
              <small className="alert alert-danger">
                El nombre del proyecto es obligatorio
              </small>
            )}
            <input
              type="text"
              className="form-control mb-2"
              id="inputProyecto"
              name="nombre"
              placeholder="Nombre proyecto"
              value={proyecto.nombre}
              onChange={handlerChange}
            />
            <button
              className="btn btn-sm btn-primary btn-block mb-2"
              onClick={crearProyecto}
            >
              Crear Proyecto
            </button>
          </div>
        )}

        <Proyectos />
      </div>
    </nav>
  );
};

export default Sidebar;
