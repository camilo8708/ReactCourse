import React, { useContext, useEffect } from "react";
import { ProyectoContext } from "../../context/proyectos/ProyectoContext";
import { TareaContext } from "../../context/tareas/TareaContext";
import Tarea from "./Tarea";
import { TransitionGroup, CSSTransition } from "react-transition-group";

const ListaTareas = () => {
  //Contexts
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto, eliminarProyecto } = proyectoContext;

  const tareaContext = useContext(TareaContext);
  const { tareas, cargarTareas } = tareaContext;

  useEffect(() => {
    if (proyecto) {
      cargarTareas(proyecto.id);
    }

    // eslint-disable-next-line
  }, [proyecto]);

  return (
    <div className="container">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-top">
        <h2>{proyecto.nombre}</h2>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button
            type="button"
            className="btn btn-sm btn-outline-secondary"
            onClick={() => eliminarProyecto(proyecto.id)}
          >
            &times; Eliminar Proyecto
          </button>
        </div>
      </div>
      <TransitionGroup>
        {tareas.map((tarea) => (
          <CSSTransition key={tarea.id} timeout={200} classNames="tarea">
            <Tarea tarea={tarea} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default ListaTareas;
