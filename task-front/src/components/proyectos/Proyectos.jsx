import React, { useContext, useEffect } from "react";
import { ProyectoContext } from "../../context/proyectos/ProyectoContext";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { AuthContext } from "../../context/autenticacion/AuthContext";

const Proyectos = () => {
  //States
  const proyectoContext = useContext(ProyectoContext);
  const { proyectos, seleccionarProyecto, obtenerProyectos } = proyectoContext;

  const authContext = useContext(AuthContext);
  const { autenticado } = authContext;

  useEffect(() => {
    if (autenticado) obtenerProyectos();

    // eslint-disable-next-line
  }, [autenticado]);

  return (
    <div className="text-center">
      <h5 className="font-weight-bold mb-2">Tus Proyectos</h5>
      {proyectos.length === 0 ? (
        <small>No existen proyectos</small>
      ) : (
        <ul className="list-group">
          <TransitionGroup>
            {proyectos.map((proyecto) => (
              <CSSTransition
                key={proyecto.id}
                timeout={500}
                classNames="proyecto"
              >
                <li
                  className="btn btn-light d-flex btn-group text-center"
                  onClick={() => seleccionarProyecto(proyecto.id)}
                >
                  <small>{proyecto.nombre}</small>
                </li>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ul>
      )}
    </div>
  );
};

export default Proyectos;
