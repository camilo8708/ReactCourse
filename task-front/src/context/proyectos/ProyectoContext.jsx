import React, { createContext, useReducer } from "react";
import ProyectoReducer from "./ProyectoReducer";
import clienteAxios from "../../config/axios";
import {
  AGREGAR_PROYECTO,
  SELECCIONAR_PROYECTO,
  ELIMINAR_PROYECTO,
  API_PROJECT,
  OBTENER_PROYECTO,
} from "../../types/index";

export const ProyectoContext = createContext();

const ProyecProvider = (props) => {
  const initialState = {
    proyecto: null,
    proyectos: [],
  };

  //dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(ProyectoReducer, initialState);

  //Funciones
  const obtenerProyectos = async () => {
    try {
      const response = await clienteAxios.get(API_PROJECT);
      dispatch({
        type: OBTENER_PROYECTO,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const agregarProyecto = async (proyecto) => {
    try {
      const response = await clienteAxios.post(API_PROJECT, proyecto);
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const seleccionarProyecto = (proyectoId) => {
    dispatch({
      type: SELECCIONAR_PROYECTO,
      payload: proyectoId,
    });
  };

  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(API_PROJECT + "/" + proyectoId);

      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProyectoContext.Provider
      value={{
        proyecto: state.proyecto,
        proyectos: state.proyectos,
        agregarProyecto: agregarProyecto,
        seleccionarProyecto: seleccionarProyecto,
        eliminarProyecto: eliminarProyecto,
        obtenerProyectos: obtenerProyectos,
      }}
    >
      {props.children}
    </ProyectoContext.Provider>
  );
};

export default ProyecProvider;
