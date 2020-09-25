import React, { useContext } from "react";
import { AuthContext } from "../../context/autenticacion/AuthContext";

const Barra = () => {
  //Context
  const authContext = useContext(AuthContext);
  const { usuario, cerrarSesion } = authContext;

  return (
    <nav className="navbar navbar-dark bg-primary col">
      {usuario && (
        <p className="navbar-brand">
          Hola <small className="font-weight-bold">{usuario.nombre}</small>
        </p>
      )}
      <div className="form-inline">
        <button className="btn btn-secondary btn-sm" onClick={cerrarSesion}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};

export default Barra;
