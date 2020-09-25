import React, { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";
import clienteAxios, { tokenAuth } from "../../config/axios";
import {
  API_USER,
  API_AUTH,
  REGISTRO,
  OBTENER_USUARIO,
  LOGIN_EXITOSO,
  CERRAR_SESION,
} from "../../types";

export const AuthContext = createContext();

const AuthProvider = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    autenticado: null,
    usuario: null,
    mensaje: null,
    cargando: true,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //Funciones
  const registrarUsuario = async (datos) => {
    try {
      const response = await clienteAxios.post(API_USER, datos);
      dispatch({
        type: REGISTRO,
        payload: {
          tipo: "alert-success",
          msg: `El usuario ${response.data.email} fue creado exitosamente`,
        },
      });
    } catch (error) {
      dispatch({
        type: REGISTRO,
        payload: { tipo: "alert-danger", msg: error.response.data.msg },
      });
    }
  };

  //Función para realizar el inicio de sesión
  const iniciarSersion = (data) => {
    //Pasar el usuario y contraseña a Base64
    const base64 = btoa(data.email + ":" + data.password);
    const auth = `Basic ${base64}`;

    clienteAxios
      .post(
        API_AUTH,
        {},
        {
          headers: {
            Authorization: auth,
          },
        }
      )
      .then(function (response) {
        dispatch({
          type: LOGIN_EXITOSO,
          payload: response.data.token,
        });

        usuarioAutenticado();
      })
      .catch(function (error) {
        dispatch({
          type: REGISTRO,
          payload: {
            tipo: "alert-danger",
            msg: "Usuario o Contraseña invalidos",
          },
        });
      });
  };

  //Consulta el usuario autenticado
  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const response = await clienteAxios.get(API_USER);

      dispatch({
        type: OBTENER_USUARIO,
        payload: response.data,
      });
    } catch (error) {
      cerrarSesion();
    }
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        mensaje: state.mensaje,
        cargando: state.cargando,
        registrarUsuario,
        iniciarSersion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
