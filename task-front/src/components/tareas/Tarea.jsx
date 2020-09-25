import React, { useContext } from "react";
import { TareaContext } from "../../context/tareas/TareaContext";

const Tarea = ({ tarea }) => {
  //Contexts
  const tareaContext = useContext(TareaContext);
  const { seleccionarTarea, eliminarTarea, cambiarEstadoTarea } = tareaContext;

  return (
    <div className="p-3 mb-2 jumbotron text-left">
      {tarea.nombre}
      <div className="float-right">
        {tarea.finalizada ? (
          <button
            className="btn btn-sm btn-success mr-1"
            onClick={() => cambiarEstadoTarea(tarea.id)}
          >
            Completo
          </button>
        ) : (
          <button
            className="btn btn-sm btn-dark mr-1"
            onClick={() => cambiarEstadoTarea(tarea.id)}
          >
            Incompleto
          </button>
        )}
        <button
          className="btn btn-sm btn-info mr-1"
          onClick={() => seleccionarTarea(tarea.id)}
        >
          Editar
        </button>
        <button
          className="btn btn-sm btn-danger mr-1"
          onClick={() => eliminarTarea(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Tarea;
