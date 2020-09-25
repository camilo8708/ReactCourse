import React, { useContext, Fragment, useState, useEffect } from "react";
import { ProyectoContext } from "../../context/proyectos/ProyectoContext";
import { TareaContext } from "../../context/tareas/TareaContext";
import ListaTareas from "./ListaTareas";

const FormularioTareas = () => {
  //Contexts
  const proyectoContext = useContext(ProyectoContext);
  const { proyecto } = proyectoContext;

  const tareaContext = useContext(TareaContext);
  const { tarea, crearTarea, editarTarea, seleccionarTarea } = tareaContext;

  //State Local
  const [tareaFormulario, setTareaFormulario] = useState({ nombre: "" });
  const [error, setError] = useState(false);

  const handlerClick = () => {
    setError(false);
    if (tareaFormulario.nombre.trim() === "") {
      setError(true);
      return;
    }

    //se realiza el proceso correspondiente
    if (tarea) {
      editarTarea(tareaFormulario);
    } else {
      tareaFormulario.projectId = proyecto.id;
      crearTarea(tareaFormulario);
    }
    //Limpiamos el formulario
    setTareaFormulario({ nombre: "" });
  };

  const handlerChange = (e) => {
    setTareaFormulario({
      ...tareaFormulario,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (tarea) {
      setTareaFormulario(tarea);
    } else {
      setTareaFormulario({ nombre: "" });
    }
  }, [tarea]);

  useEffect(() => {
    if (tarea) {
      seleccionarTarea(null);
    }

    // eslint-disable-next-line
  }, [proyecto]);

  if (!proyecto) return <h2>Seleccione un proyecto</h2>;

  return (
    <Fragment>
      <div className="form-group p-4">
        {error && (
          <p className="alert alert-danger">El nombre es obligatorio</p>
        )}
        <input
          className="form-control mb-2"
          placeholder="Nombre tarea"
          name="nombre"
          value={tareaFormulario.nombre}
          onChange={handlerChange}
        />
        <button className="btn btn-primary btn-block" onClick={handlerClick}>
          {!tarea ? "Crear Tarea" : "Actualizar Tarea"}
        </button>
      </div>
      <ListaTareas />
    </Fragment>
  );
};

export default FormularioTareas;
