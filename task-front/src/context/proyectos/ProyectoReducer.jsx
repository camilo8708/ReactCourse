import {
  AGREGAR_PROYECTO,
  SELECCIONAR_PROYECTO,
  ELIMINAR_PROYECTO,
  OBTENER_PROYECTO,
} from "../../types/index";

export default (state, action) => {
  switch (action.type) {
    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
      };

    case SELECCIONAR_PROYECTO:
      return {
        ...state,
        proyecto: state.proyectos.filter(
          (proyecto) => proyecto.id === action.payload
        )[0],
      };

    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyecto: null,
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto.id !== action.payload
        ),
      };

    case OBTENER_PROYECTO:
      return {
        ...state,
        proyectos: action.payload,
      };

    default:
      return state;
  }
};
