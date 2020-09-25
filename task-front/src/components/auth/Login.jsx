import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/autenticacion/AuthContext";

const Login = (props) => {
  //Context
  const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSersion } = authContext;

  //States Locales
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  const [alerta, setAlerta] = useState(null);
  const [procesando, setProcesando] = useState(false);

  useEffect(() => {
    if (autenticado) {
      props.history.push("/home");
    }

    if (mensaje) {
      setAlerta(mensaje);
    }
  }, [mensaje, autenticado, props.history]);

  //Funciones
  const handlerSubmit = (e) => {
    e.preventDefault();
    setProcesando(true);
    setAlerta(null);
    //Validación de los campos
    if (usuario.email.trim() === "" || usuario.password.trim() === "") {
      setAlerta({
        tipo: "alert-danger",
        msg: "Todos los datos son obligatorios",
      });
      setProcesando(false);
      return;
    }
    //Submit
    iniciarSersion(usuario);
    setProcesando(false);
  };

  //Función para actualizar el estado cuando cambia un valor
  const handlerChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="row align-items-center p-5 m-4">
      <div className="col-lg-3"></div>
      <div className="col-lg-6 jumbotron">
        <form className="container-sm" onSubmit={handlerSubmit}>
          <h1 className="text-center">Iniciar Sesión</h1>
          {alerta && (
            <p className={`alert ${alerta.tipo} text-center`}>{alerta.msg}</p>
          )}
          <div className="form-group">
            <label htmlFor="inputEmail">Email address</label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              name="email"
              onChange={handlerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              name="password"
              aria-describedby="passwordHelp"
              onChange={handlerChange}
            />
            <small id="passwordHelp" className="form-text text-muted">
              We'll never share your password with anyone else.
            </small>
          </div>
          <button type="submit" className="btn btn-primary btn-block mb-3">
            {procesando ? (
              <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            ) : (
              "Iniciar Sesión"
            )}
          </button>
          <Link to={"/register"}>Crear Cuenta</Link>
        </form>
      </div>
      <div className="col-lg-3"></div>
    </div>
  );
};

export default Login;
