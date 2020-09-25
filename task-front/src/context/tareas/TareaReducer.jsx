import {
  SELECCIONAR_TAREA,
  CARGAR_TAREAS_PROYECTOS,
  AGREGAR_TAREA,
  EDITAR_TAREA,
  ELIMINAR_TAREA,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case SELECCIONAR_TAREA:
      return {
        ...state,
        tarea:
          action.payload !== null
            ? state.tareas.filter((tarea) => tarea.id === action.payload)[0]
            : action.payload,
      };

    case CARGAR_TAREAS_PROYECTOS:
      return {
        ...state,
        tareas: action.payload,
      };

    case AGREGAR_TAREA:
      return {
        ...state,
        tareas: [...state.tareas, action.payload],
      };

    case EDITAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.map((tarea) =>
          tarea.id === action.payload.id ? action.payload : tarea
        ),
        tarea: null,
      };

    case ELIMINAR_TAREA:
      return {
        ...state,
        tareas: state.tareas.filter((tarea) => tarea.id !== action.payload),
      };

    default:
      return state;
  }
};
