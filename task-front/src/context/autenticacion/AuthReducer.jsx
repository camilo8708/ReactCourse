import {
  REGISTRO,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  CERRAR_SESION,
} from "../../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTRO:
      return {
        ...state,
        mensaje: action.payload,
      };

    case LOGIN_EXITOSO:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        autenticado: true,
        mensaje: null,
        cargando: false,
      };

    case OBTENER_USUARIO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
        cargando: false,
      };

    case CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        autenticado: false,
        usuario: null,
        cargando: false,
      };

    default:
      return state;
  }
};
