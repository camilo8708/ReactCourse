import React, { createContext, useReducer } from "react";
import TareaReducer from "./TareaReducer";
import clienteAxios from "../../config/axios";
import {
  SELECCIONAR_TAREA,
  CARGAR_TAREAS_PROYECTOS,
  AGREGAR_TAREA,
  EDITAR_TAREA,
  ELIMINAR_TAREA,
  API_TASK,
} from "../../types";

export const TareaContext = createContext();

const TareaProvider = (props) => {
  const initialState = {
    tarea: null,
    tareas: [],
  };

  const [state, dispatch] = useReducer(TareaReducer, initialState);

  //Funciones
  const cargarTareas = async (proyectoId) => {
    try {
      const response = await clienteAxios.get(
        `${API_TASK}/projects/${proyectoId}`
      );

      dispatch({
        type: CARGAR_TAREAS_PROYECTOS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const seleccionarTarea = (tareaId) => {
    dispatch({
      type: SELECCIONAR_TAREA,
      payload: tareaId,
    });
  };

  const crearTarea = async (tarea) => {
    try {
      const response = await clienteAxios.post(API_TASK, tarea);

      dispatch({
        type: AGREGAR_TAREA,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const editarTarea = async (tarea) => {
    try {
      const response = await clienteAxios.post(API_TASK, tarea);

      dispatch({
        type: EDITAR_TAREA,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarTarea = async (tareaId) => {
    try {
      await clienteAxios.delete(API_TASK + "/" + tareaId);

      dispatch({
        type: ELIMINAR_TAREA,
        payload: tareaId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const cambiarEstadoTarea = (tareaId) => {
    let tareaTmp = state.tareas.filter((tarea) => tarea.id === tareaId)[0];
    tareaTmp.finalizada = !tareaTmp.finalizada;
    editarTarea(tareaTmp);
  };

  return (
    <TareaContext.Provider
      value={{
        tarea: state.tarea,
        tareas: state.tareas,
        cargarTareas: cargarTareas,
        seleccionarTarea: seleccionarTarea,
        crearTarea: crearTarea,
        editarTarea: editarTarea,
        eliminarTarea: eliminarTarea,
        cambiarEstadoTarea: cambiarEstadoTarea,
      }}
    >
      {props.children}
    </TareaContext.Provider>
  );
};

export default TareaProvider;
